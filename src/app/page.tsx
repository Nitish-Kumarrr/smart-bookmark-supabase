import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-br from-indigo-100 via-purple-100 to-pink-100 text-gray-800">

      <section className="flex flex-col items-center justify-center text-center px-6 py-24">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
          Organize Your Web
          <span className="text-indigo-600"> Beautifully</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-8">
          Smart Bookmark Manager helps you save, edit, and manage your
          favorite links securely with real-time sync across all devices.
        </p>

        <div className="flex gap-4">
          <Link
            href="/login"
            className="bg-indigo-600 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Get Started
          </Link>

          <Link
            href="#features"
            className="bg-white px-8 py-3 rounded-xl shadow-md hover:shadow-lg transition"
          >
            Learn More
          </Link>
        </div>
      </section>

      <section id="features" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-14">
          Why Choose Smart Bookmark?
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-4">⚡ Real-Time Sync</h3>
            <p className="text-gray-600">
              Your bookmarks update instantly across devices using powerful
              real-time technology.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-4">🔒 Secure & Private</h3>
            <p className="text-gray-600">
              Your data is encrypted and protected with authentication and
              secure storage.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-4">🎨 Clean UI</h3>
            <p className="text-gray-600">
              Minimal, modern design that keeps you focused and organized.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-indigo-600 text-white text-center py-20 px-6">
        <h2 className="text-3xl font-bold mb-6">
          Start Managing Your Links Today
        </h2>
        <p className="mb-8 text-indigo-100">
          Join now and organize your digital life smarter.
        </p>
        <Link
          href="/login"
          className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-semibold hover:scale-105 transition"
        >
          Create Free Account
        </Link>
      </section>

    </main>
  );
}
