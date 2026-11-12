
import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServer } from "../../../../lib/supabase-server";
import { createSupabaseAdmin } from "../../../../lib/supabase-admin";

const BUFFER_MINUTES = 30;

function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createSupabaseServer();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (
      !process.env.ADMIN_USER_ID ||
      user.id !== process.env.ADMIN_USER_ID
    ) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { id, status, duration_minutes } = body;

    if (
      !Number.isSafeInteger(id) ||
      id <= 0 ||
      !["confirmed", "declined"].includes(status)
    ) {
      return NextResponse.json(
        { error: "Invalid booking ID or status" },
        { status: 400 }
      );
    }

    if (
      status === "confirmed" &&
      (
        !Number.isInteger(duration_minutes) ||
        duration_minutes < 30 ||
        duration_minutes > 720
      )
    ) {
      return NextResponse.json(
        { error: "Invalid appointment duration" },
        { status: 400 }
      );
    }

    const adminDb = createSupabaseAdmin();

    const { data: booking, error: bookingError } = await adminDb
      .from("bookings")
      .select("*")
      .eq("id", id)
      .eq("status", "pending")
      .maybeSingle();

    if (bookingError) {
      return NextResponse.json(
        { error: "Failed to load booking" },
        { status: 500 }
      );
    }

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found or already processed" },
        { status: 409 }
      );
    }

    if (status === "confirmed") {
      const { data: confirmedBookings, error: conflictError } =
        await adminDb
          .from("bookings")
          .select("id, appointment_time, duration_minutes")
          .eq("appointment_date", booking.appointment_date)
          .eq("status", "confirmed");

      if (conflictError) {
        return NextResponse.json(
          { error: "Could not check availability" },
          { status: 500 }
        );
      }

      const newStart = timeToMinutes(booking.appointment_time);
      const newEnd = newStart + duration_minutes;

      const hasConflict = (confirmedBookings ?? []).some(
        (existing) => {
          const existingStart = timeToMinutes(
            existing.appointment_time
          );

          if (
            !Number.isInteger(existing.duration_minutes) ||
            existing.duration_minutes <= 0
          ) {
            return true;
          }

          const existingEnd =
            existingStart + existing.duration_minutes;

          return (
            newStart < existingEnd + BUFFER_MINUTES &&
            existingStart < newEnd + BUFFER_MINUTES
          );
        }
      );

      if (hasConflict) {
        return NextResponse.json(
          {
            error:
              "This time conflicts with another confirmed booking.",
          },
          { status: 409 }
        );
      }
    }

    const { data: updated, error: updateError } = await adminDb
      .from("bookings")
      .update({
        status,
        duration_minutes:
          status === "confirmed" ? duration_minutes : null,
      })
      .eq("id", id)
      .eq("status", "pending")
      .select("id, status, duration_minutes")
      .maybeSingle();

    if (updateError) {
      return NextResponse.json(
        { error: "Failed to update booking" },
        { status: 500 }
      );
    }

    if (!updated) {
      return NextResponse.json(
        { error: "Booking already processed" },
        { status: 409 }
      );
    }

    return NextResponse.json({
      message: "Booking updated successfully",
      booking: updated,
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
