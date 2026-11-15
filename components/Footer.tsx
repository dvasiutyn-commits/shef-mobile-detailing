
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  function openCookieSettings() {
    try {
      localStorage.removeItem("shef-cookie-consent");
    } catch {
      // Ignore storage errors.
    }

    window.dispatchEvent(
      new Event("shef-consent-changed")
    );

    window.location.reload();
  }

  return (
    <footer className="border-t border-white/10 bg-[#0B0B0B]">
      <div className="mx-auto max-w-5xl px-6 py-16">

        {/* Logo */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            SHEF{" "}
            <span className="text-yellow-400">
              MOBILE
            </span>{" "}
            DETAILING
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-gray-400">
            Professional mobile detailing delivered to your
            home or workplace throughout the Chicagoland area.
          </p>
        </div>

        {/* Social */}
        <div className="mt-10 flex justify-center gap-6">
          <a
            href="https://www.instagram.com/shef.detailing/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 transition hover:text-yellow-400"
          >
            Instagram
          </a>

          <span className="text-gray-700">•</span>

          <a
            href="https://share.google/Rkx6px6qEGxqPE8q3"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 transition hover:text-yellow-400"
          >
            Google Reviews
          </a>
        </div>

        {/* Navigation */}
        <div className="mt-12 border-y border-white/10 py-6">
          <div className="flex flex-wrap justify-center gap-8 text-gray-400">

            <Link
              href={pathname === "/" ? "#services" : "/#services"}
              className="transition hover:text-yellow-400"
            >
              Services
            </Link>

            <Link
              href={pathname === "/" ? "#pricing" : "/#pricing"}
              className="transition hover:text-yellow-400"
            >
              Pricing
            </Link>

            <Link
              href={pathname === "/" ? "#reviews" : "/#reviews"}
              className="transition hover:text-yellow-400"
            >
              Reviews
            </Link>

            <Link
              href={pathname === "/" ? "#faq" : "/#faq"}
              className="transition hover:text-yellow-400"
            >
              FAQ
            </Link>

            <Link
              href="/booking"
              className="transition hover:text-yellow-400"
            >
              Book Now
            </Link>
          </div>
        </div>

        {/* Contact */}
        <div className="mt-10 flex flex-col items-center gap-3 text-gray-400">
          <a
            href="tel:+13128852920"
            className="transition hover:text-yellow-400"
          >
            (312) 885-2920
          </a>

          <a
            href="mailto:dvasiutyn@gmail.com"
            className="transition hover:text-yellow-400"
          >
            dvasiutyn@gmail.com
          </a>

          <p>Serving Chicagoland Area</p>
        </div>

        {/* Privacy */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-5 text-sm text-gray-400">
          <Link
            href="/privacy-policy"
            className="transition hover:text-yellow-400"
          >
            Privacy Policy
          </Link>

          <span className="text-gray-700">•</span>

          <button
            type="button"
            onClick={openCookieSettings}
            className="transition hover:text-yellow-400"
          >
            Cookie Settings
          </button>
        </div>

        {/* Copyright */}
        <div className="mt-12 text-center text-sm text-gray-500">
          © 2026 SHEF Mobile Detailing. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
