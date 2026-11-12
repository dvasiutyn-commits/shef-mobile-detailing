
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type BookingActionsProps = {
  bookingId: number;
  status: string;
  service: string;
  vehicleType: string;
};

function getSuggestedDuration(
  service: string,
  vehicleType: string
) {
  let minutes = 180;

  if (service === "Exterior") minutes = 90;
  if (service === "Full") minutes = 300;
  if (service === "Ceramic") minutes = 240;

  if (vehicleType === "SUV" || vehicleType === "Truck") {
    minutes += 30;
  }

  if (vehicleType === "Van") {
    minutes += 60;
  }

  return minutes;
}

export default function BookingActions({
  bookingId,
  status,
  service,
  vehicleType,
}: BookingActionsProps) {
  const router = useRouter();

  const [duration, setDuration] = useState(
    getSuggestedDuration(service, vehicleType)
  );

  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState("");

  async function updateBooking(
    newStatus: "confirmed" | "declined"
  ) {
    if (loading || completed || status !== "pending") {
      return;
    }

    if (newStatus === "declined") {
      const approved = window.confirm(
        "Are you sure you want to decline this booking?"
      );

      if (!approved) return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: bookingId,
          status: newStatus,
          duration_minutes:
            newStatus === "confirmed" ? duration : null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to update booking."
        );
      }

      setCompleted(true);
      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Could not update booking. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  if (status !== "pending") {
    return null;
  }

  return (
    <div className="mt-5 border-t border-zinc-800 pt-5">
      <h4 className="mb-3 font-semibold text-white">
        Estimated Work Duration
      </h4>

      <p className="mb-3 text-sm text-zinc-400">
        Suggested automatically. You can adjust it
        before confirming.
      </p>

      <select
        value={duration}
        onChange={(e) => setDuration(Number(e.target.value))}
        disabled={loading || completed}
        className="mb-3 w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3 text-white md:max-w-xs"
      >
        {[
          60, 90, 120, 150, 180, 210,
          240, 270, 300, 330, 360, 420, 480,
        ].map((minutes) => (
          <option key={minutes} value={minutes}>
            {Math.floor(minutes / 60)}h{" "}
            {minutes % 60 > 0
              ? `${minutes % 60}m`
              : ""}
          </option>
        ))}
      </select>

      <p className="mb-5 text-sm text-yellow-500">
        + 30-minute buffer automatically added
        between appointments.
      </p>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          disabled={loading || completed}
          onClick={() => updateBooking("confirmed")}
          className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-500 disabled:opacity-50"
        >
          {completed
            ? "Updated"
            : loading
              ? "Updating..."
              : "Confirm"}
        </button>

        <button
          type="button"
          disabled={loading || completed}
          onClick={() => updateBooking("declined")}
          className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-500 disabled:opacity-50"
        >
          Decline
        </button>
      </div>

      {error && (
        <p role="alert" className="mt-3 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
