
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Consent = "accepted" | "rejected";

const STORAGE_KEY = "shef-cookie-consent";

function getSavedConsent(): Consent | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved === "accepted" || saved === "rejected") {
      return saved;
    }
  } catch {
    return null;
  }

  return null;
}

export default function CookieConsent() {
  const [consent, setConsent] = useState<Consent | null>(
    getSavedConsent
  );

  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setConsent(getSavedConsent());
      setReady(true);
    }, 0);

    return () => window.clearTimeout(id);
  }, []);

  function saveConsent(value: Consent) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // The banner still works if storage is unavailable.
    }

    setConsent(value);

    window.dispatchEvent(
      new Event("shef-consent-changed")
    );
  }

  if (!ready || consent !== null) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-5">
      <div className="mx-auto max-w-3xl rounded-2xl border border-zinc-700 bg-zinc-950 p-5 text-white shadow-2xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h2 className="text-base font-bold">
              Your Privacy Matters
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              We use optional advertising cookies to
              measure website visits and appointment
              requests. You can accept or reject tracking
              without affecting your booking experience.
            </p>

            <Link
              href="/privacy-policy"
              className="mt-2 inline-block text-sm text-yellow-500 underline hover:text-yellow-400"
            >
              Privacy Policy
            </Link>
          </div>

          <div className="flex shrink-0 gap-3">
            <button
              type="button"
              onClick={() => saveConsent("rejected")}
              className="flex-1 rounded-xl border border-zinc-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              Reject
            </button>

            <button
              type="button"
              onClick={() => saveConsent("accepted")}
              className="flex-1 rounded-xl bg-yellow-500 px-5 py-3 text-sm font-bold text-black transition hover:bg-yellow-400"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
