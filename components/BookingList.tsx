
"use client";

import { useState } from "react";
import BookingActions from "./BookingActions";

type Booking = {
  id: number;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  service: string;
  vehicle_type: string;
  vehicle_year: number;
  vehicle_make: string;
  vehicle_model: string;
  appointment_date: string;
  appointment_time: string;
  street_address: string;
  city: string;
  zip_code: string;
  estimated_price: number;
  notes: string | null;
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

export default function BookingList({ bookings }: Props) {
  const [filter, setFilter] = useState("pending");

  const pendingCount = bookings.filter(
    (booking) => booking.status === "pending"
  ).length;

  const confirmedCount = bookings.filter(
    (booking) => booking.status === "confirmed"
  ).length;

  const declinedCount = bookings.filter(
    (booking) => booking.status === "declined"
  ).length;

  const filteredBookings = bookings.filter(
    (booking) => booking.status === filter
  );

  return (
    <div className="mt-8">
      <h2 className="mb-5 text-2xl font-bold text-white">
        Customer Bookings ({bookings.length})
      </h2>

      <div className="mb-6 flex flex-wrap gap-2">
        {[
          { value: "pending", label: "Pending", count: pendingCount },
          { value: "confirmed", label: "Confirmed", count: confirmedCount },
          { value: "declined", label: "Declined", count: declinedCount },
        ].map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setFilter(tab.value)}
            className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${
              filter === tab.value
                ? "border-yellow-500 bg-yellow-500 text-black"
                : "border-zinc-700 bg-black text-zinc-300 hover:border-yellow-500"
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {filteredBookings.length === 0 ? (
        <p className="rounded-xl border border-zinc-800 bg-black p-5 text-zinc-400">
          No {filter} bookings.
        </p>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="rounded-xl border border-zinc-700 bg-black p-5"
            >
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-lg font-bold text-white">
                  {booking.customer_name}
                </h3>

                <span className="rounded-full border border-yellow-500 px-3 py-1 text-sm font-semibold text-yellow-500">
                  {booking.status}
                </span>
              </div>

              <div className="grid gap-3 text-sm text-zinc-300 md:grid-cols-2">
                <p>
                  <strong>Phone:</strong> {booking.customer_phone}
                </p>

                <p>
                  <strong>Email:</strong> {booking.customer_email}
                </p>

                <p>
                  <strong>Service:</strong> {booking.service}
                </p>

                <p>
                  <strong>Vehicle:</strong> {booking.vehicle_year}{" "}
                  {booking.vehicle_make} {booking.vehicle_model}
                </p>

                <p>
                  <strong>Date:</strong> {booking.appointment_date}
                </p>

                <p>
                  <strong>Time:</strong>{" "}
                  {formatTime(booking.appointment_time)}
                </p>

                <p>
                  <strong>Location:</strong> {booking.street_address},{" "}
                  {booking.city}, IL {booking.zip_code}
                </p>

                <p>
                  <strong>Estimated Price:</strong> $
                  {booking.estimated_price}
                </p>
              </div>

              {booking.notes && (
                <p className="mt-4 text-sm text-zinc-400">
                  <strong>Notes:</strong> {booking.notes}
                </p>
              )}

              <BookingActions
                bookingId={booking.id}
                status={booking.status}
                service={booking.service}
                vehicleType={booking.vehicle_type}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
