export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold">SHEF MOBILE DETAILING</h1>

        <p className="mt-6 text-xl text-gray-300">
          Premium Mobile Detailing at Your Doorstep
        </p>

        <button className="mt-10 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl text-lg font-semibold transition">
          Book Now
        </button>
      </div>
    </main>
  );
}