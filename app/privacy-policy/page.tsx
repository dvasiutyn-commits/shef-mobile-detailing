
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | SHEF Mobile Detailing",
  description:
    "Learn how SHEF Mobile Detailing collects, uses, and protects your personal information.",
};

export default function PrivacyPolicy() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16 text-white">
      <h1 className="mb-4 text-4xl font-bold">
        Privacy Policy
      </h1>

      <p className="mb-10 text-sm text-zinc-400">
        Last updated: November 15, 2026
      </p>

      <div className="space-y-10 text-zinc-300">
        <section>
          <h2 className="mb-3 text-2xl font-semibold text-white">
            1. Information We Collect
          </h2>
          <p>
            When you request an appointment or contact SHEF
            Mobile Detailing, we may collect your name, phone
            number, email address, service address, vehicle
            information, preferred appointment date and time,
            and any additional information you provide.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-white">
            2. How We Use Your Information
          </h2>
          <p>
            We use your information to respond to inquiries,
            process appointment requests, provide detailing
            services, communicate about appointments, and
            improve our customer experience.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-white">
            3. Cookies and Advertising
          </h2>
          <p>
            With your consent, our website may use Meta Pixel
            to measure website visits and appointment requests
            and evaluate the effectiveness of our advertising
            campaigns.
          </p>
          <p className="mt-3">
            You can decline optional advertising cookies
            without affecting your ability to request an
            appointment or use our website.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-white">
            4. Third-Party Service Providers
          </h2>
          <p>
            We use trusted third-party services to operate
            our website, manage appointment requests, and
            send notifications. These may include Netlify
            for website hosting, Supabase for booking data,
            and Resend for email notifications.
          </p>
          <p className="mt-3">
            When advertising tracking is enabled with your
            consent, Meta may also process information
            associated with your website activity.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-white">
            5. Data Security and Retention
          </h2>
          <p>
            We take reasonable measures to protect personal
            information against unauthorized access, misuse,
            or disclosure. We retain information as needed
            to provide our services, maintain business
            records, and comply with applicable obligations.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-white">
            6. Your Privacy Choices
          </h2>
          <p>
            You may contact us to request access to,
            correction of, or deletion of your personal
            information, subject to applicable legal
            requirements and exceptions.
          </p>
          <p className="mt-3">
            You may also decline optional advertising
            tracking through the privacy choices
            provided on our website.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-white">
            7. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy to reflect
            changes in our services, technology, or legal
            requirements. Updates will be posted on
            this page.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-white">
            8. Contact Us
          </h2>
          <p>
            If you have questions about this Privacy Policy
            or how we handle personal information, please
            contact SHEF Mobile Detailing through our website.
          </p>
        </section>
      </div>
    </main>
  );
}
