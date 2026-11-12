"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full backdrop-blur-md transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-black/90 shadow-lg"
          : "bg-black/40"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
            SHEF <span className="text-yellow-400">MOBILE</span> DETAILING
          </h2>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#services"
            className="text-white transition hover:text-yellow-400"
          >
            Services
          </a>

          <a
            href="#pricing"
            className="text-white transition hover:text-yellow-400"
          >
            Pricing
          </a>

          <a
            href="#reviews"
            className="text-white transition hover:text-yellow-400"
          >
            Reviews
          </a>

          <a
            href="#faq"
            className="text-white transition hover:text-yellow-400"
          >
            FAQ
          </a>

          <a
            href="/booking"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-yellow-500 px-5 py-2 font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-yellow-400 active:scale-95"
          >
            Book Now
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="text-white transition-transform duration-200 active:scale-90 md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-white/10 bg-black/95 backdrop-blur-md md:hidden">
          <nav className="flex flex-col px-6 py-5">
            <a
              href="#services"
              onClick={closeMenu}
              className="border-b border-white/10 py-4 text-lg font-medium text-white transition hover:text-yellow-400"
            >
              Services
            </a>

            <a
              href="#pricing"
              onClick={closeMenu}
              className="border-b border-white/10 py-4 text-lg font-medium text-white transition hover:text-yellow-400"
            >
              Pricing
            </a>

            <a
              href="#reviews"
              onClick={closeMenu}
              className="border-b border-white/10 py-4 text-lg font-medium text-white transition hover:text-yellow-400"
            >
              Reviews
            </a>

            <a
              href="#faq"
              onClick={closeMenu}
              className="border-b border-white/10 py-4 text-lg font-medium text-white transition hover:text-yellow-400"
            >
              FAQ
            </a>

            <a
              href="/booking"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="mt-5 rounded-full bg-yellow-500 px-6 py-3 text-center font-semibold text-black transition-all duration-300 hover:bg-yellow-400 active:scale-95"
            >
              Book Now
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}