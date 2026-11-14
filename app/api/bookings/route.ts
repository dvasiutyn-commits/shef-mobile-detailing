
import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase-admin";
import { Resend } from "resend";

export const runtime = "nodejs";

const BUFFER_MINUTES = 30;

const prices: Record<string, number[]> = {
  Interior: [120, 160, 170, 190],
  Exterior: [80, 100, 120, 140],
  Full: [180, 230, 260, 300],
  Ceramic: [249, 299, 349, 349],
};

const vehicles = ["Sedan / Coupe", "SUV", "Truck", "Van"];

const conditionPrices: Record<string, number> = {
  light: 0,
  moderate: 20,
  deep: 50,
  heavy: 90,
};

const addonRules: Record<
  string,
  { price: number; services: string[] }
> = {
  pet: { price: 40, services: ["Interior", "Full"] },
  stains: { price: 50, services: ["Interior", "Full"] },
  ozone: { price: 0, services: ["Interior", "Full"] },
  clay: { price: 0, services: ["Exterior", "Full"] },
};

const timeSlots = [
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

const validMakes = [
  "Acura", "Audi", "BMW", "Buick", "Cadillac",
  "Chevrolet", "Chrysler", "Dodge", "Ford",
  "Genesis", "GMC", "Honda", "Hyundai",
  "Infiniti", "Jeep", "Kia", "Land Rover",
  "Lexus", "Lincoln", "Mazda", "Mercedes-Benz",
  "MINI", "Mitsubishi", "Nissan", "Porsche",
  "Ram", "Rivian", "Subaru", "Tesla", "Toyota",
  "Volkswagen", "Volvo", "Other",
];

function convertTime(value: string) {
  const [clock, period] = value.split(" ");
  const [hour, minute] = clock.split(":").map(Number);
  const hour24 = (hour % 12) + (period === "PM" ? 12 : 0);

  return `${String(hour24).padStart(2, "0")}:${String(
    minute
  ).padStart(2, "0")}:00`;
}

function timeToMinutes(value: string) {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

function getDuration(service: string, vehicle: string) {
  let duration = 180;

  if (service === "Exterior") duration = 90;
  if (service === "Full") duration = 300;
  if (service === "Ceramic") duration = 240;

  if (vehicle === "SUV" || vehicle === "Truck") {
    duration += 30;
  }

  if (vehicle === "Van") {
    duration += 60;
  }

  return duration;
}

function fitsBusinessHours(
  date: string,
  time: string,
  duration: number
) {
  const month = Number(date.split("-")[1]);
  const isSummer = month >= 4 && month <= 9;

  const closingTime = isSummer ? 20 * 60 : 18 * 60;
  const latestStart = isSummer
    ? 17 * 60
    : 15 * 60 + 30;

  const start = timeToMinutes(time);
  const end = start + duration;

  return (
    start >= 8 * 60 &&
    start <= latestStart &&
    end <= closingTime
  );
}

function isValidDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day ||
    date.getUTCDay() === 0
  ) {
    return false;
  }

  const tomorrow = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(
    new Date(Date.now() + 24 * 60 * 60 * 1000)
  );

  return value >= tomorrow;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        { error: "Invalid request." },
        { status: 400 }
      );
    }

    const {
      service, vehicle, condition, addons,
      date, time, address, city, zip,
      year, make, model, notes,
      name, phone, email,
    } = body;

    if (
      typeof service !== "string" ||
      !Object.hasOwn(prices, service) ||
      typeof vehicle !== "string" ||
      !vehicles.includes(vehicle) ||
      !Array.isArray(addons) ||
      addons.length > 4 ||
      !addons.every((id) => typeof id === "string") ||
      new Set(addons).size !== addons.length
    ) {
      return NextResponse.json(
        { error: "Invalid service or add-ons." },
        { status: 400 }
      );
    }

    const hasInterior =
      service === "Interior" || service === "Full";

    if (
      hasInterior &&
      (
        typeof condition !== "string" ||
        !Object.hasOwn(conditionPrices, condition)
      )
    ) {
      return NextResponse.json(
        { error: "Invalid vehicle condition." },
        { status: 400 }
      );
    }

    if (
      addons.some(
        (id: string) =>
          !Object.hasOwn(addonRules, id) ||
          !addonRules[id].services.includes(service)
      )
    ) {
      return NextResponse.json(
        { error: "Invalid add-ons for this service." },
        { status: 400 }
      );
    }

    if (
      typeof date !== "string" ||
      !isValidDate(date) ||
      typeof time !== "string" ||
      !timeSlots.includes(time)
    ) {
      return NextResponse.json(
        { error: "Select a valid appointment date and time." },
        { status: 400 }
      );
    }

    const appointmentTime = convertTime(time);
    const duration = getDuration(service, vehicle);

    // Check seasonal business hours
    if (!fitsBusinessHours(date, appointmentTime, duration)) {
      return NextResponse.json(
        {
          error:
            "This appointment does not fit within our business hours.",
        },
        { status: 400 }
      );
    }

    if (
      typeof address !== "string" ||
      address.length > 150 ||
      !/^(?=.*[a-zA-Z])\d+[a-zA-Z]?\s+[a-zA-Z0-9 .'-]{4,}$/.test(
        address.trim()
      ) ||
      typeof city !== "string" ||
      city.length > 80 ||
      !/^[a-zA-Z][a-zA-Z .'-]{2,}$/.test(city.trim()) ||
      typeof zip !== "string" ||
      !/^\d{5}$/.test(zip.trim())
    ) {
      return NextResponse.json(
        { error: "Enter a valid service address." },
        { status: 400 }
      );
    }

    if (
      typeof year !== "string" ||
      !/^\d{4}$/.test(year) ||
      Number(year) < 1980 ||
      Number(year) > new Date().getFullYear() + 1 ||
      typeof make !== "string" ||
      !validMakes.includes(make) ||
      typeof model !== "string" ||
      model.trim().length < 2 ||
      model.length > 80 ||
      !/^[a-zA-Z0-9][a-zA-Z0-9 -]*$/.test(
        model.trim()
      )
    ) {
      return NextResponse.json(
        { error: "Enter valid vehicle information." },
        { status: 400 }
      );
    }

    const phoneDigits =
      typeof phone === "string"
        ? phone.replace(/\D/g, "")
        : "";

    if (
      typeof name !== "string" ||
      name.length > 100 ||
      name.trim().length < 3 ||
      !/^[a-zA-ZÀ-ÿ' -]+$/.test(name.trim()) ||
      !/^[2-9]\d{2}[2-9]\d{6}$/.test(phoneDigits) ||
      typeof email !== "string" ||
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email.trim()
      ) ||
      (
        notes !== undefined &&
        (
          typeof notes !== "string" ||
          notes.length > 2000
        )
      )
    ) {
      return NextResponse.json(
        { error: "Enter valid contact information." },
        { status: 400 }
      );
    }

    const vehicleIndex = vehicles.indexOf(vehicle);
    const basePrice = prices[service][vehicleIndex];

    const conditionPrice = hasInterior
      ? conditionPrices[condition]
      : 0;

    const addonPrice = addons.reduce(
      (total: number, id: string) =>
        total + addonRules[id].price,
      0
    );

    const estimatedPrice =
      basePrice + conditionPrice + addonPrice;

    const supabase = createSupabaseAdmin();

    // Check existing confirmed appointments
    const { data: confirmedBookings, error: availabilityError } =
      await supabase
        .from("bookings")
        .select("appointment_time, duration_minutes")
        .eq("appointment_date", date)
        .eq("status", "confirmed");

    if (availabilityError) {
      return NextResponse.json(
        { error: "Could not check availability. Please try again." },
        { status: 500 }
      );
    }

    const start = timeToMinutes(appointmentTime);
    const end = start + duration;

    const hasConflict = (confirmedBookings ?? []).some(
      (booking) => {
        if (
          !Number.isInteger(booking.duration_minutes) ||
          booking.duration_minutes <= 0
        ) {
          return true;
        }

        const busyStart = timeToMinutes(
          booking.appointment_time
        );

        const busyEnd =
          busyStart + booking.duration_minutes;

        return (
          start < busyEnd + BUFFER_MINUTES &&
          busyStart < end + BUFFER_MINUTES
        );
      }
    );

    if (hasConflict) {
      return NextResponse.json(
        {
          error:
            "This time is no longer available. Please select another time.",
        },
        { status: 409 }
      );
    }

    // Prevent duplicate pending requests
const { data: existingRequest, error: duplicateCheckError } =
  await supabase
    .from("bookings")
    .select("id")
    .eq("customer_phone", phoneDigits)
    .eq("appointment_date", date)
    .eq("appointment_time", appointmentTime)
    .eq("status", "pending")
    .limit(1);

if (duplicateCheckError) {
  return NextResponse.json(
    { error: "Could not verify your request. Please try again." },
    { status: 500 }
  );
}

if (existingRequest && existingRequest.length > 0) {
  return NextResponse.json(
    {
      error:
        "You already have a pending request for this date and time.",
    },
    { status: 409 }
  );
}

    // Save appointment request
    const { error } = await supabase
      .from("bookings")
      .insert({
        customer_name: name.trim(),
        customer_phone: phoneDigits,
        customer_email: email.trim().toLowerCase(),
        service,
        vehicle_type: vehicle,
        vehicle_year: Number(year),
        vehicle_make: make,
        vehicle_model: model.trim(),
        vehicle_condition: hasInterior ? condition : null,
        addons,
        appointment_date: date,
        appointment_time: appointmentTime,
        street_address: address.trim(),
        city: city.trim(),
        zip_code: zip.trim(),
        notes:
          typeof notes === "string"
            ? notes.trim() || null
            : null,
        estimated_price: estimatedPrice,
        status: "pending",
        duration_minutes: null,
      });

    if (error) {
      console.error(
        "Booking insert failed:",
        error.code,
        error.message
      );

      return NextResponse.json(
        {
          error:
            "Unable to save your request. Please try again.",
        },
        { status: 500 }
      );
    }

    // Email notification after successful booking
    try {
      const adminEmail = process.env.SHEF_ADMIN_EMAIL;
      const apiKey = process.env.RESEND_API_KEY;

      if (adminEmail && apiKey) {
        const resend = new Resend(apiKey);

        const { error: emailError } = await resend.emails.send({
          from: "SHEF Booking <onboarding@resend.dev>",
          to: adminEmail,
          subject: `New Booking Request - ${name.trim()}`,
          text: [
            "NEW BOOKING REQUEST",
            "",
            `Customer: ${name.trim()}`,
            `Phone: ${phoneDigits}`,
            `Email: ${email.trim()}`,
            "",
            `Service: ${service}`,
            `Vehicle: ${year} ${make} ${model.trim()}`,
            `Vehicle type: ${vehicle}`,
            `Condition: ${hasInterior ? condition : "N/A"}`,
            `Add-ons: ${addons.length ? addons.join(", ") : "None"}`,
            "",
            `Date: ${date}`,
            `Time: ${time}`,
            `Estimated price: $${estimatedPrice}`,
            "",
            `Address: ${address.trim()}, ${city.trim()}, ${zip.trim()}`,
            `Notes: ${typeof notes === "string" ? notes.trim() : ""}`,
            "",
            "Status: Pending confirmation",
          ].join("\n"),
        });

        if (emailError) {
          console.error(
            "Resend notification failed:",
            emailError.message
          );
        }
      } else {
        console.warn(
          "Email notification skipped: Resend configuration missing."
        );
      }
    } catch (emailError) {
      console.error("Email notification failed:", emailError);
    }

    return NextResponse.json(
      { message: "Booking request received." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking request failed:", error);

    return NextResponse.json(
      { error: "Unable to process your request." },
      { status: 500 }
    );
  }
}
