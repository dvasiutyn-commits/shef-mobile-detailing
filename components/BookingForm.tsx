
"use client";

import { useEffect, useState } from "react";
import VehicleModelInput from "./VehicleModelInput";

const prices = {
  Interior: [120, 160, 170, 190],
  Exterior: [80, 100, 120, 140],
  Full: [180, 230, 260, 300],
  Ceramic: [249, 299, 349, 349],
};

type Service = keyof typeof prices;

const vehicles = ["Sedan / Coupe", "SUV", "Truck", "Van"];

const services: {
  id: Service;
  name: string;
  description: string;
}[] = [
  {
    id: "Interior",
    name: "Interior Detail",
    description: "Professional interior cleaning and detailing.",
  },
  {
    id: "Exterior",
    name: "Exterior Detail",
    description: "Hand wash, wheels, tires, and exterior finishing.",
  },
  {
    id: "Full",
    name: "Full Detail",
    description: "Complete interior and exterior detailing.",
  },
  {
    id: "Ceramic",
    name: "Ceramic Spray Coating",
    description: "Paint protection, enhanced gloss, and water repellency.",
  },
];

const conditions = [
  {
    id: "light",
    name: "Light Cleaning",
    description: "Light dust, minor dirt, and regular upkeep.",
    price: 0,
  },
  {
    id: "moderate",
    name: "Moderate Cleaning",
    description: "Everyday dirt and noticeable buildup.",
    price: 20,
  },
  {
    id: "deep",
    name: "Deep Cleaning",
    description: "Accumulated dirt requiring thorough cleaning.",
    price: 50,
  },
  {
    id: "heavy",
    name: "Heavy Dirt / Stains",
    description: "Heavy buildup, stubborn stains, or extensive cleaning.",
    price: 90,
  },
];

const availableAddons = [
  {
    id: "pet",
    name: "Pet Hair Removal",
    description: "Removal of pet hair from seats and carpets.",
    price: 40 as number | null,
    services: ["Interior", "Full"],
  },
  {
    id: "stains",
    name: "Deep Stain Extraction",
    description: "Deep cleaning of fabric seats and carpets.",
    price: 50 as number | null,
    services: ["Interior", "Full"],
  },
  {
    id: "ozone",
    name: "Ozone Odor Treatment",
    description: "Additional odor treatment after interior cleaning.",
    price: null as number | null,
    services: ["Interior", "Full"],
  },
  {
    id: "clay",
    name: "Clay Treatment",
    description: "Removal of bonded contaminants from exterior paint.",
    price: null as number | null,
    services: ["Exterior", "Full"],
  },
];

const makes = [
  "Acura", "Audi", "BMW", "Buick", "Cadillac",
  "Chevrolet", "Chrysler", "Dodge", "Ford",
  "Genesis", "GMC", "Honda", "Hyundai",
  "Infiniti", "Jeep", "Kia", "Land Rover",
  "Lexus", "Lincoln", "Mazda", "Mercedes-Benz",
  "MINI", "Mitsubishi", "Nissan", "Porsche",
  "Ram", "Rivian", "Subaru", "Tesla", "Toyota",
  "Volkswagen", "Volvo", "Other",
];

const timeSlots = [
  "8:00 AM", "9:00 AM", "10:00 AM",
  "11:00 AM", "12:00 PM", "1:00 PM",
  "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
];

function getTomorrow() {
  const date = new Date();
  date.setDate(date.getDate() + 1);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function isSunday(value: string) {
  if (!value) return false;

  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day).getDay() === 0;
}

function FieldError({ message }: { message: string }) {
  return (
    <p className="mt-2 text-sm text-red-400">{message}</p>
  );
}

export default function BookingForm() {
  const [step, setStep] = useState(1);

  const [service, setService] = useState<Service>("Interior");
  const [vehicle, setVehicle] = useState("SUV");
  const [condition, setCondition] = useState("light");
  const [addons, setAddons] = useState<string[]>([]);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [busySlots, setBusySlots] = useState<
  { start: string; duration: number | null }[]
>([]);

const [availabilityLoading, setAvailabilityLoading] =
  useState(false);

const [availabilityError, setAvailabilityError] =
  useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [notes, setNotes] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
  if (!date) {
    return;
  }

  let cancelled = false;

  async function loadAvailability() {
    setAvailabilityLoading(true);
    setAvailabilityError("");
    setBusySlots([]);

    try {
      const response = await fetch(
        `/api/availability?date=${encodeURIComponent(date)}`,
        { cache: "no-store" }
      );

      if (!response.ok) {
        throw new Error("Failed to load availability");
      }

      const data = await response.json();

      if (!cancelled) {
        setBusySlots(data.busySlots);
      }
    } catch {
      if (!cancelled) {
        setAvailabilityError(
          "Could not check available times. Please try again."
        );
      }
    } finally {
      if (!cancelled) {
        setAvailabilityLoading(false);
      }
    }
  }

  loadAvailability();

  return () => {
    cancelled = true;
  };
}, [date]);

  const basePrice = prices[service][vehicles.indexOf(vehicle)];
  const hasInterior = service === "Interior" || service === "Full";

  const selectedCondition = conditions.find(
    (item) => item.id === condition
  );

  const conditionPrice = hasInterior
    ? selectedCondition?.price ?? 0
    : 0;

  const visibleAddons = availableAddons.filter((addon) =>
    addon.services.includes(service)
  );

  const selectedAddons = visibleAddons.filter((addon) =>
    addons.includes(addon.id)
  );

  const addonTotal = selectedAddons.reduce(
    (total, addon) => total + (addon.price ?? 0),
    0
  );

  const estimatedPrice = basePrice + conditionPrice + addonTotal;

  const selectedService = services.find(
    (item) => item.id === service
  );

  // VALIDATION

  const validDate =
    date !== "" &&
    date >= getTomorrow() &&
    !isSunday(date);

  
function timeToMinutes(value: string) {
  const match = value.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);

  if (!match) return -1;

  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const period = match[3].toUpperCase();

  if (hours === 12) hours = 0;
  if (period === "PM") hours += 12;

  return hours * 60 + minutes;
}

function isSlotAvailable(slot: string) {
  if (!validDate || availabilityLoading || availabilityError) {
    return false;
  }

  const start = timeToMinutes(slot);

  if (start < 0) return false;

  // Estimated duration for each service
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

  const end = start + duration;
  const buffer = 30;

  // Seasonal business hours
const selectedMonth = Number(date.split("-")[1]);

const isSummer =
  selectedMonth >= 4 && selectedMonth <= 9;

const closingTime = isSummer ? 20 * 60 : 18 * 60;

const latestStart = isSummer
  ? 17 * 60
  : 15 * 60 + 30;

// Appointment must fit within business hours
if (start > latestStart || end > closingTime) {
  return false;
}

  return busySlots.every((booking) => {
    if (
      typeof booking.duration !== "number" ||
      booking.duration <= 0
    ) {
      return false;
    }

    const [hours, minutes] = booking.start.split(":").map(Number);
    const busyStart = hours * 60 + minutes;
    const busyEnd = busyStart + booking.duration;

    return (
      end + buffer <= busyStart ||
      start >= busyEnd + buffer
    );
  });
}

const validTime =
  timeSlots.includes(time) && isSlotAvailable(time);


  const validAddress =
    /^(?=.*[a-zA-Z])\d+[a-zA-Z]?\s+[a-zA-Z0-9 .'-]{4,}$/.test(
      address.trim()
    ) &&
    address.trim().length >= 8;

  const validCity =
    /^[a-zA-Z][a-zA-Z .'-]{2,}$/.test(city.trim());

  const validZip = /^\d{5}$/.test(zip.trim());

  const validYear =
    /^\d{4}$/.test(year) &&
    Number(year) >= 1980 &&
    Number(year) <= new Date().getFullYear() + 1;

  const validMake = makes.includes(make);

  const validModel =
    model.trim().length >= 2 &&
    /^[a-zA-Z0-9][a-zA-Z0-9 -]*$/.test(model.trim());

  const step3Valid =
    validDate &&
    validTime &&
    validAddress &&
    validCity &&
    validZip &&
    validYear &&
    validMake &&
    validModel;

  const validName =
    name.trim().length >= 3 &&
    /^[a-zA-ZÀ-ÿ' -]+$/.test(name.trim());

  const phoneDigits = phone.replace(/\D/g, "");

  const validPhone =
    phoneDigits.length === 10 &&
    /^[2-9]\d{2}[2-9]\d{6}$/.test(phoneDigits);

  const validEmail =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const step4Valid = validName && validPhone && validEmail;

  function selectService(id: Service) {
    setService(id);
    setAddons([]);
  }

  function toggleAddon(id: string) {
    setAddons((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  function nextStep() {
    if (step === 3 && !step3Valid) return;
    if (step < 4) setStep(step + 1);
  }

  // SEND BOOKING TO API

  async function submitBooking() {
    if (
      !step3Valid ||
      !step4Valid ||
      isSubmitting ||
      submitSuccess
    ) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service,
          vehicle,
          condition,
          addons,
          date,
          time,
          address,
          city,
          zip,
          year,
          make,
          model,
          notes,
          name,
          phone,
          email,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to submit booking");
      }

      setSubmitSuccess(true);
    } catch {
      setSubmitError(
        "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-zinc-700 bg-black p-4 text-white focus:border-yellow-500 focus:outline-none";

  const labelClass =
    "mb-2 block font-semibold text-white";

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 md:p-8">

      {/* PROGRESS */}

      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-semibold text-yellow-500">
            STEP {step} OF 4
          </span>

          <span className="text-sm text-zinc-400">
            {step === 1
              ? "Service & Vehicle"
              : step === 2
              ? "Vehicle Condition & Add-ons"
              : step === 3
              ? "Appointment Details"
              : "Contact & Review"}
          </span>
        </div>

        <div className="h-1.5 overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-yellow-500 transition-all"
            style={{ width: `${step * 25}%` }}
          />
        </div>
      </div>

      {/* STEP 1 */}

      {step === 1 && (
        <>
          <h2 className="text-2xl font-bold text-white">
            Select Your Service
          </h2>

          <p className="mb-8 mt-2 text-sm text-zinc-400">
            Choose your detailing package and vehicle type.
          </p>

          <div className="mb-8 grid gap-4 md:grid-cols-2">
            {services.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => selectService(item.id)}
                aria-pressed={service === item.id}
                className={`rounded-xl border p-5 text-left transition ${
                  service === item.id
                    ? "border-yellow-500 bg-yellow-500/10"
                    : "border-zinc-700 hover:border-zinc-500"
                }`}
              >
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-semibold text-white">
                    {item.name}
                  </h3>

                  <span
                    className={`h-4 w-4 rounded-full border ${
                      service === item.id
                        ? "border-yellow-500 bg-yellow-500"
                        : "border-zinc-600"
                    }`}
                  />
                </div>

                <p className="mb-4 text-sm text-zinc-400">
                  {item.description}
                </p>

                <p className="font-semibold text-yellow-500">
                  From ${prices[item.id][0]}
                </p>
              </button>
            ))}
          </div>

          <div className="mb-8">
            <label htmlFor="vehicle" className={labelClass}>
              Vehicle Type
            </label>

            <select
              id="vehicle"
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              className={inputClass}
            >
              {vehicles.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {service === "Ceramic" && (
            <div className="mb-8 rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-4">
              <p className="font-semibold text-yellow-500">
                Seasonal Availability
              </p>

              <p className="mt-1 text-sm text-zinc-300">
                Ceramic Spray Coating is available during
                warmer months only. Appointments depend
                on suitable weather and application conditions.
              </p>
            </div>
          )}
        </>
      )}

      {/* STEP 2 */}

      {step === 2 && (
        <>
          {hasInterior && (
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-white">
                Vehicle Condition
              </h2>

              <p className="mb-6 mt-2 text-sm text-zinc-400">
                How would you describe your vehicle&apos;s
                interior condition?
              </p>

              <div className="space-y-3">
                {conditions.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCondition(item.id)}
                    aria-pressed={condition === item.id}
                    className={`flex w-full items-center justify-between gap-4 rounded-xl border p-5 text-left transition ${
                      condition === item.id
                        ? "border-yellow-500 bg-yellow-500/10"
                        : "border-zinc-700 hover:border-zinc-500"
                    }`}
                  >
                    <div>
                      <p className="font-semibold text-white">
                        {item.name}
                      </p>

                      <p className="mt-1 text-sm text-zinc-400">
                        {item.description}
                      </p>

                      <p className="mt-2 text-sm font-semibold text-yellow-500">
                        {item.price === 0
                          ? "Included"
                          : `+$${item.price}`}
                      </p>
                    </div>

                    <span
                      className={`h-5 w-5 shrink-0 rounded-full border ${
                        condition === item.id
                          ? "border-yellow-500 bg-yellow-500"
                          : "border-zinc-600"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          <h2 className="text-2xl font-bold text-white">
            Additional Services
          </h2>

          <p className="mb-6 mt-2 text-sm text-zinc-400">
            Customize your detail with optional services.
            You can skip this section.
          </p>

          {visibleAddons.length > 0 ? (
            <div className="mb-8 space-y-3">
              {visibleAddons.map((addon) => (
                <label
                  key={addon.id}
                  className={`flex cursor-pointer items-center justify-between gap-4 rounded-xl border p-5 transition ${
                    addons.includes(addon.id)
                      ? "border-yellow-500 bg-yellow-500/10"
                      : "border-zinc-700 hover:border-zinc-500"
                  }`}
                >
                  <div>
                    <p className="font-semibold text-white">
                      {addon.name}
                    </p>

                    <p className="mt-1 text-sm text-zinc-400">
                      {addon.description}
                    </p>

                    <p className="mt-2 text-sm font-semibold text-yellow-500">
                      {addon.price === null
                        ? "Price upon inspection"
                        : `From $${addon.price}`}
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    checked={addons.includes(addon.id)}
                    onChange={() => toggleAddon(addon.id)}
                    className="h-5 w-5 shrink-0 accent-yellow-500"
                  />
                </label>
              ))}
            </div>
          ) : (
            <div className="mb-8 rounded-xl border border-zinc-700 p-6 text-sm text-zinc-400">
              Your selected package already includes the
              necessary preparation. No additional services
              are required.
            </div>
          )}
        </>
      )}

      {/* STEP 3 */}

      {step === 3 && (
        <>
          <h2 className="text-2xl font-bold text-white">
            Appointment Details
          </h2>

          <p className="mb-8 mt-2 text-sm text-zinc-400">
            Select your preferred date and time.
            Your appointment will be confirmed after review.
          </p>

          <div className="mb-8 grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="date" className={labelClass}>
                Preferred Date *
              </label>

              <input
                id="date"
                type="date"
                min={getTomorrow()}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={inputClass}
              />

              {date && !validDate && (
                <FieldError message="Select a future date from Monday through Saturday." />
              )}
            </div>

            <div>
              <label htmlFor="time" className={labelClass}>
                Preferred Time *
              </label>

              <select
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className={inputClass}
              >
                <option value="">Select a time</option>

                {timeSlots.map((slot) => {
       const available = isSlotAvailable(slot);

           return (
           <option
            key={slot}
             value={slot}
               disabled={!available}
             >
                {slot} {!available ? "(Unavailable)" : ""}
              </option>
            );
              })}
              </select>
            </div>
          </div>

          <div className="mb-8 rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-4">
            <p className="font-semibold text-yellow-500">
              Appointment Request
            </p>

            <p className="mt-1 text-sm text-zinc-300">
              Your selected date and time are preferences only.
              SHEF Mobile Detailing will contact you to confirm
              availability, final pricing, and appointment details.
            </p>
          </div>

          <h3 className="mb-5 text-xl font-bold text-white">
            Service Location
          </h3>

          <div className="mb-8 space-y-5">
            <div>
              <label htmlFor="address" className={labelClass}>
                Street Address *
              </label>

              <input
                id="address"
                type="text"
                autoComplete="street-address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="123 Main Street"
                className={inputClass}
              />

              {address.length > 0 && !validAddress && (
                <FieldError message="Enter a street number and street name. Example: 123 Main Street." />
              )}
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="city" className={labelClass}>
                  City *
                </label>

                <input
                  id="city"
                  type="text"
                  autoComplete="address-level2"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Mount Prospect"
                  className={inputClass}
                />

                {city.length > 0 && !validCity && (
                  <FieldError message="Enter a valid city name." />
                )}
              </div>

              <div>
                <label htmlFor="zip" className={labelClass}>
                  ZIP Code *
                </label>

                <input
                  id="zip"
                  type="text"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  maxLength={5}
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  placeholder="60056"
                  className={inputClass}
                />

                {zip.length > 0 && !validZip && (
                  <FieldError message="ZIP Code must contain exactly 5 digits." />
                )}
              </div>
            </div>
          </div>

          <h3 className="mb-5 text-xl font-bold text-white">
            Vehicle Information
          </h3>

          <div className="mb-8 grid gap-5 md:grid-cols-3">
            <div>
              <label htmlFor="year" className={labelClass}>
                Year *
              </label>

              <input
                id="year"
                type="text"
                inputMode="numeric"
                maxLength={4}
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="2020"
                className={inputClass}
              />

              {year.length > 0 && !validYear && (
                <FieldError message="Enter a valid vehicle year." />
              )}
            </div>

            <div>
              <label htmlFor="make" className={labelClass}>
                Make *
              </label>

              <select
                id="make"
                value={make}
                onChange={(e) => {
                  setMake(e.target.value);
                  setModel("");
                }}
                className={inputClass}
              >
                <option value="">Select Make</option>

                {makes.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="model" className={labelClass}>
                Model *
              </label>

              <VehicleModelInput
                make={make}
                value={model}
                onChange={setModel}
                className={inputClass}
              />

              {model.length > 0 && !validModel && (
                <FieldError message="Enter a vehicle model using letters or numbers." />
              )}
            </div>
          </div>

          <div className="mb-8">
            <label htmlFor="notes" className={labelClass}>
              Additional Notes (Optional)
            </label>

            <textarea
              id="notes"
              rows={4}
              maxLength={2000}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Tell us about stains, pet hair, parking, or special requests..."
              className={inputClass}
            />
          </div>

          {!step3Valid && (
            <p className="mb-6 text-sm text-zinc-400">
              Complete all required fields correctly to continue.
            </p>
          )}
        </>
      )}

      {/* STEP 4 */}

      {step === 4 && (
        <>
          <h2 className="text-2xl font-bold text-white">
            Contact Information
          </h2>

          <p className="mb-8 mt-2 text-sm text-zinc-400">
            Enter your contact details so we can confirm
            your appointment request.
          </p>

          <div className="mb-10 space-y-5">
            <div>
              <label htmlFor="name" className={labelClass}>
                Full Name *
              </label>

              <input
                id="name"
                type="text"
                autoComplete="name"
                maxLength={100}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Smith"
                className={inputClass}
              />

              {name.length > 0 && !validName && (
                <FieldError message="Enter your full name." />
              )}
            </div>

            <div>
              <label htmlFor="phone" className={labelClass}>
                Phone Number *
              </label>

              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(312) 555-1234"
                className={inputClass}
              />

              {phone.length > 0 && !validPhone && (
                <FieldError message="Enter a valid 10-digit US phone number." />
              )}
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>
                Email Address *
              </label>

              <input
                id="email"
                type="email"
                autoComplete="email"
                maxLength={254}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className={inputClass}
              />

              {email.length > 0 && !validEmail && (
                <FieldError message="Enter a valid email address." />
              )}
            </div>
          </div>

          <h2 className="mb-5 text-2xl font-bold text-white">
            Review Your Request
          </h2>

          <div className="mb-8 space-y-5 rounded-xl border border-zinc-700 bg-black p-5">
            <div>
              <p className="text-sm text-zinc-500">Service</p>
              <p className="mt-1 font-semibold text-white">
                {selectedService?.name}
              </p>
            </div>

            <div>
              <p className="text-sm text-zinc-500">Vehicle</p>
              <p className="mt-1 text-white">
                {year} {make} {model} — {vehicle}
              </p>
            </div>

            {hasInterior && (
              <div>
                <p className="text-sm text-zinc-500">
                  Vehicle Condition
                </p>
                <p className="mt-1 text-white">
                  {selectedCondition?.name}
                </p>
              </div>
            )}

            <div>
              <p className="text-sm text-zinc-500">
                Additional Services
              </p>

              {selectedAddons.length > 0 ? (
                <div className="mt-1 space-y-1">
                  {selectedAddons.map((addon) => (
                    <p key={addon.id} className="text-white">
                      {addon.name}
                      {addon.price === null
                        ? " — Quote Required"
                        : ` — From $${addon.price}`}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="mt-1 text-white">None</p>
              )}
            </div>

            <div>
              <p className="text-sm text-zinc-500">
                Preferred Appointment
              </p>
              <p className="mt-1 text-white">
                {date} at {time}
              </p>
            </div>

            <div>
              <p className="text-sm text-zinc-500">
                Service Location
              </p>
              <p className="mt-1 text-white">
                {address}, {city}, IL {zip}
              </p>
            </div>

            {notes.trim() !== "" && (
              <div>
                <p className="text-sm text-zinc-500">
                  Additional Notes
                </p>
                <p className="mt-1 whitespace-pre-wrap text-white">
                  {notes}
                </p>
              </div>
            )}

            <div className="border-t border-zinc-800 pt-5">
              <p className="text-sm text-zinc-400">
                Estimated Starting Price
              </p>

              <p className="mt-1 text-3xl font-bold text-yellow-500">
                ${estimatedPrice}
              </p>

              <p className="mt-2 text-xs text-zinc-500">
                This is an estimate, not a final quote.
                Pricing and availability are confirmed
                before your appointment.
              </p>
            </div>
          </div>

          <div className="mb-8 rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-4">
            <p className="font-semibold text-yellow-500">
              Confirmation Required
            </p>

            <p className="mt-1 text-sm text-zinc-300">
              Submitting a request does not guarantee an
              appointment. SHEF Mobile Detailing will contact
              you to confirm availability and final pricing.
            </p>
          </div>

          {!step4Valid && (
            <p className="mb-6 text-sm text-zinc-400">
              Complete your contact information correctly.
            </p>
          )}
        </>
      )}

      {/* ESTIMATE */}

      {step < 4 && (
        <div className="mb-8 rounded-xl border border-zinc-700 bg-black p-5">
          <p className="text-sm text-zinc-400">
            Estimated Starting Price
          </p>

          <p className="mt-2 text-3xl font-bold text-yellow-500">
            ${estimatedPrice}
          </p>

          {selectedAddons.some((addon) => addon.price === null) && (
            <p className="mt-2 text-xs text-yellow-500">
              Some selected services require an additional quote.
            </p>
          )}

          <p className="mt-2 text-xs text-zinc-500">
            Final pricing will be confirmed based on vehicle
            condition and service requirements.
          </p>
        </div>
      )}

      {/* NAVIGATION */}

      <div className="flex gap-3">
        {step > 1 && !submitSuccess && (
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => setStep(step - 1)}
            className="w-1/3 rounded-xl border border-zinc-700 px-4 py-4 font-semibold text-white transition hover:bg-zinc-800 disabled:opacity-50"
          >
            Back
          </button>
        )}

        {step < 4 ? (
          <button
            type="button"
            disabled={step === 3 && !step3Valid}
            onClick={nextStep}
            className={`rounded-xl bg-yellow-500 px-6 py-4 font-bold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-50 ${
              step === 1 ? "w-full" : "w-2/3"
            }`}
          >
            Continue →
          </button>
        ) : (
          <button
            type="button"
            disabled={
              !step3Valid ||
              !step4Valid ||
              isSubmitting ||
              submitSuccess
            }
            onClick={submitBooking}
            className="w-2/3 rounded-xl bg-yellow-500 px-4 py-4 font-bold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting
              ? "Sending..."
              : submitSuccess
              ? "Request Sent!"
              : "Request Appointment"}
          </button>
        )}
      </div>

      {/* SUBMISSION ERROR */}

      {step === 4 && submitError && (
        <p
          role="alert"
          className="mt-4 text-center text-sm text-red-400"
        >
          {submitError}
        </p>
      )}

      {/* SUBMISSION SUCCESS */}

      {step === 4 && submitSuccess && (
        <div
          role="status"
          className="mt-4 rounded-xl border border-green-700 bg-green-950/30 p-4 text-center"
        >
          <p className="font-semibold text-green-400">
            Request received!
          </p>

          <p className="mt-2 text-sm text-zinc-300">
            Thank you! SHEF Mobile Detailing will contact
            you to confirm availability, final pricing,
            and appointment details.
            Your appointment is not confirmed yet.
          </p>
        </div>
      )}
    </div>
  );
}
