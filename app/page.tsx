"use client"
import Navbar from "@/shared/navbar";
import { useAuth } from "@/app/lib/hooks/useAuth";


export default function Home() {
  const { isSignedIn } = useAuth();
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar isSignedIn={isSignedIn}/>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-orange-200/40 via-pink-200/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-20 left-1/2 w-64 h-64 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl" />

        <div className="relative px-8 py-24 md:py-32 max-w-6xl mx-auto">
          {/* Welcome Badge */}
          <div className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-sm font-medium mb-8">
            Welcome to our community
            <span className="text-lg">👋</span>
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-purple-600 bg-clip-text text-transparent mb-6 max-w-3xl">
            Discover Stories That Inspire
          </h2>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-10">
            Join over 50,000 readers who get fresh perspectives on technology,
            design, lifestyle, and more. Stay informed, stay inspired.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <button className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:from-pink-600 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/25">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Get Weekly Newsletter
            </button>
            <button className="flex items-center gap-2 border-2 border-purple-500 text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-purple-50 transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              Start Reading
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
