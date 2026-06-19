import React from 'react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300 font-sans">
      
      {/* Navigation */}
      <nav className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="text-xl font-bold tracking-tight">
          teemit<span className="text-blue-600">.</span>
        </div>
        <Link href="/login">
          <button className="text-sm font-medium border border-gray-200 dark:border-gray-800 px-4 py-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-all">
            Sign In
          </button>
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 pt-16 pb-24">
        <div className="max-w-3xl">
          <div className="inline-block px-3 py-1 mb-6 text-[10px] font-bold tracking-widest uppercase border border-blue-600/20 text-blue-600 rounded-md bg-blue-50/50 dark:bg-blue-900/20">
            The Builder Network
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
            Connect with builders. <br />
            <span className="text-gray-400 dark:text-gray-500 font-medium">Build your dream team.</span>
          </h1>
          
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-xl leading-relaxed">
            teemit is a premium matchmaking platform for developers, designers, and founders to form high-impact teams and ship projects faster.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/login">
              <button className="px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-lg font-semibold text-sm hover:opacity-90 transition-all shadow-sm">
                Get Started
              </button>
            </Link>
            <Link href="/login">
              <button className="px-6 py-2.5 border border-gray-200 dark:border-gray-800 rounded-lg font-semibold text-sm hover:bg-gray-50 dark:hover:bg-gray-900 transition-all">
                Learn More
              </button>
            </Link>
          </div>
        </div>

        {/* Feature Grid (Minimalist) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-24 border-t border-gray-100 dark:border-gray-900 pt-16">
          <div>
            <h3 className="text-sm font-bold mb-2 uppercase tracking-wide">Verified Talent</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">Access a curated network of builders. High-quality collaboration, no noise.</p>
          </div>
          <div>
            <h3 className="text-sm font-bold mb-2 uppercase tracking-wide">Smart Match</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">Our system connects you with skills that complement yours for project success.</p>
          </div>
          <div>
            <h3 className="text-sm font-bold mb-2 uppercase tracking-wide">Privacy First</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">Secure Google OAuth verification to ensure a trusted network of real builders.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-10 border-t border-gray-50 dark:border-gray-900 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-xs text-gray-400">© 2024 teemit. Built for the builders.</p>
        <div className="flex gap-6 text-xs font-medium text-gray-500">
          <Link href="/privacy" className="hover:text-black dark:hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-black dark:hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </footer>
    </div>
  );
}