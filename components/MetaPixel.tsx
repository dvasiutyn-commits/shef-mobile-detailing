
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const PIXEL_ID = "1461833609177058";
const STORAGE_KEY = "shef-cookie-consent";

type MetaWindow = Window & {
  fbq?: (...args: unknown[]) => void;
  _fbq?: (...args: unknown[]) => void;
};

let pixelInitialized = false;

function hasConsent() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "accepted";
  } catch {
    return false;
  }
}

function initializePixel() {
  if (!hasConsent() || pixelInitialized) return;

  const metaWindow = window as MetaWindow;

  if (typeof metaWindow.fbq !== "function") {
    const fbq = (...args: unknown[]) => {
      if (typeof fbq.callMethod === "function") {
        fbq.callMethod(...args);
      } else {
        fbq.queue.push(args);
      }
    };

    fbq.queue = [] as unknown[][];
    fbq.callMethod = undefined as
      | ((...args: unknown[]) => void)
      | undefined;

    Object.assign(fbq, {
      loaded: true,
      version: "2.0",
      push: fbq,
    });

    metaWindow.fbq = fbq;
    metaWindow._fbq = fbq;
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  metaWindow.fbq?.("init", PIXEL_ID);
  metaWindow.fbq?.("track", "PageView");

  pixelInitialized = true;
}

export default function MetaPixel() {
  const pathname = usePathname();

  useEffect(() => {
    initializePixel();

    window.addEventListener(
      "shef-consent-changed",
      initializePixel
    );

    return () => {
      window.removeEventListener(
        "shef-consent-changed",
        initializePixel
      );
    };
  }, []);

  useEffect(() => {
    if (pixelInitialized && hasConsent()) {
      // PageView is already tracked during initialization.
      // Additional route tracking can be added if needed.
    }
  }, [pathname]);

  return null;
}
