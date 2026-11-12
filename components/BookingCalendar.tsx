
"use client";

import { useState } from "react";

type Booking = {
  id: number;
  customer_name: string;
  service: string;
  vehicle_type: string;
  appointment_date: string;
  appointment_time: string;
  duration_minutes: number | null;
  status: string;
};

type Props = {
  bookings: Booking[];
};

function formatTime(time: string) {
  const [hours, minutes] = time.split(":").map(Number);

  const hour = hours % 12 || 12;
  const period = hours >= 12 ? "PM" : "AM";

  return `${hour}:${String(minutes).padStart(2, "0")} ${period}`;
}

function getEndTime(time: string, duration: number) {
  const [hours, minutes] = time.split(":").map(Number);
  const total = hours * 60 + minutes + duration;

  const endHours = Math.floor(total / 60);
  const endMinutes = total % 60;

  return formatTime(
    `${String(endHours).padStart(2, "0")}:${String(
      endMinutes
    ).padStart(2, "0")}`
  );
}

export default function BookingCalendar({ bookings }: Props) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const today = new Date();

    return new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );
  });

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const confirmedBookings = bookings.filter(
    (booking) => booking.status === "confirmed"
  );

  function changeMonth(amount: number) {
    setCurrentMonth(
      new Date(year, month + amount, 1)
    );
  }

  const monthTitle = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const cells = [
    ...Array(firstDay).fill(null),
    ...Array.from(
      { length: daysInMonth },
      (_, index) => index + 1
    ),
  ];

  return (
    <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-5 md:p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Booking Calendar
          </h2>

          <p className="mt-1 text-sm text-zinc-400">
            Confirmed appointments only
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => changeMonth(-1)}
            className="rounded-lg border border-zinc-700 px-3 py-2 text-white hover:bg-zinc-800"
          >
            ←
          </button>

          <span className="min-w-28 text-center text-sm font-semibold text-white">
            {monthTitle}
          </span>

          <button
            type="button"
            onClick={() => changeMonth(1)}
            className="rounded-lg border border-zinc-700 px-3 py-2 text-white hover:bg-zinc-800"
          >
            →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 md:gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
          (day) => (
            <div
              key={day}
              className="py-2 text-center text-xs font-semibold text-zinc-400"
            >
              {day}
            </div>
          )
        )}

        {cells.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} />;
          }

          const dateString = `${year}-${String(
            month + 1
          ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

          const dayBookings = confirmedBookings.filter(
            (booking) =>
              booking.appointment_date === dateString
          );

          const today = new Date();

          const isToday =
            today.getFullYear() === year &&
            today.getMonth() === month &&
            today.getDate() === day;

          return (
            <div
              key={dateString}
              className={`min-h-24 rounded-lg border p-1.5 md:min-h-32 md:p-2 ${
                isToday
                  ? "border-yellow-500"
                  : "border-zinc-800"
              }`}
            >
              <p
                className={`mb-2 text-sm font-semibold ${
                  isToday
                    ? "text-yellow-500"
                    : "text-white"
                }`}
              >
                {day}
              </p>

              <div className="space-y-1">
                {dayBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="rounded bg-green-900/50 p-1 text-[10px] text-green-300 md:p-2 md:text-xs"
                    title={`${booking.customer_name} — ${booking.service}`}
                  >
                    <p className="font-semibold">
                      {formatTime(booking.appointment_time)}
                    </p>

                    <p className="hidden truncate md:block">
                      {booking.customer_name}
                    </p>

                    <p className="hidden truncate md:block">
                      {booking.service}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8">
        <h3 className="mb-4 text-lg font-bold text-white">
          Confirmed Appointments
        </h3>

        {confirmedBookings.length === 0 ? (
          <p className="text-sm text-zinc-400">
            No confirmed appointments yet.
          </p>
        ) : (
          <div className="space-y-3">
            {[...confirmedBookings]
              .sort((a, b) =>
                `${a.appointment_date} ${a.appointment_time}`.localeCompare(
                  `${b.appointment_date} ${b.appointment_time}`
                )
              )
              .map((booking) => (
                <div
                  key={booking.id}
                  className="rounded-xl border border-zinc-800 bg-black p-4"
                >
                  <p className="font-semibold text-white">
                    {booking.customer_name}
                  </p>

                  <p className="mt-1 text-sm text-zinc-400">
                    {booking.appointment_date} ·{" "}
                    {formatTime(booking.appointment_time)}
                    {" – "}
                    {getEndTime(
                      booking.appointment_time,
                      booking.duration_minutes ?? 180
                    )}
                  </p>

                  <p className="mt-1 text-sm text-zinc-400">
                    {booking.service} · {booking.vehicle_type}
                  </p>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
