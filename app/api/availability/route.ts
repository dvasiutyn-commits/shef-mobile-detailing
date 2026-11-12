
import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "../../../lib/supabase-admin";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const date = request.nextUrl.searchParams.get("date");

    // Validate the requested date
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json(
        { error: "Invalid date" },
        { status: 400 }
      );
    }

    const [year, month, day] = date.split("-").map(Number);
    const parsedDate = new Date(Date.UTC(year, month - 1, day));

    if (
      parsedDate.getUTCFullYear() !== year ||
      parsedDate.getUTCMonth() !== month - 1 ||
      parsedDate.getUTCDate() !== day
    ) {
      return NextResponse.json(
        { error: "Invalid date" },
        { status: 400 }
      );
    }

    const adminDb = createSupabaseAdmin();

    // Only confirmed bookings block time
    const { data, error } = await adminDb
      .from("bookings")
      .select("appointment_time, duration_minutes")
      .eq("appointment_date", date)
      .eq("status", "confirmed");

    if (error) {
      return NextResponse.json(
        { error: "Could not check availability" },
        { status: 500 }
      );
    }

    const busySlots = (data ?? []).map((booking) => ({
      start: booking.appointment_time,
      duration: booking.duration_minutes,
    }));

    return NextResponse.json(
      { date, busySlots },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
