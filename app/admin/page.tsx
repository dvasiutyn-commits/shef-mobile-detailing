
import { redirect } from "next/navigation";
import { createSupabaseServer } from "../../lib/supabase-server";
import { createSupabaseAdmin } from "../../lib/supabase-admin";
import BookingList from "../../components/BookingList";
import BookingCalendar from "../../components/BookingCalendar";

export default async function AdminPage() {
  const supabase = await createSupabaseServer();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/admin/login");
  }

  if (
    !process.env.ADMIN_USER_ID ||
    user.id !== process.env.ADMIN_USER_ID
  ) {
    redirect("/");
  }

  const adminDb = createSupabaseAdmin();

  const { data: bookings, error: bookingsError } =
    await adminDb
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 font-semibold text-yellow-500">
          SHEF MOBILE DETAILING
        </p>

        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>

        <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-5 md:p-8">
          <h2 className="text-xl font-semibold">
            Welcome to SHEF Admin!
          </h2>

          <p className="mt-3 text-zinc-400">
            Your administrator account has been verified.
          </p>

          {bookingsError ? (
            <p className="mt-8 text-red-400">
              Failed to load bookings. Please try again.
            </p>
          ) : (
            <BookingList bookings={bookings ?? []} />
          )}
        </div>

        {!bookingsError && (
          <BookingCalendar bookings={bookings ?? []} />
        )}
      </div>
    </main>
  );
}
