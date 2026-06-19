import React from 'react'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      {/* Navbar */}
      <nav className="border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex justify-between items-center sticky top-0 bg-white/80 dark:bg-black/80 backdrop-blur-md z-10">
        <div className="text-2xl font-bold tracking-tighter">teemit<span className="text-blue-600">.</span></div>
        <div className="flex items-center gap-6">
          <button className="text-sm font-medium hover:opacity-70">Projects</button>
          <button className="text-sm font-medium hover:opacity-70">Find Builders</button>
          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"></div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-8">
        {/* Header Section */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Welcome back, Builder.</h1>
          <p className="text-gray-500 dark:text-gray-400">Here's what's happening in your network today.</p>
        </header>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Main Action */}
          <div className="md:col-span-2 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0A0A0A] hover:border-blue-600/50 transition-all cursor-pointer group">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              Start a New Project 
              <span className="text-blue-600 group-hover:translate-x-1 transition-transform">→</span>
            </h3>
            <p className="text-gray-500 dark:text-gray-400">Looking for a co-founder or a specific skill? Start your search here.</p>
          </div>

          {/* Card 2: Stats */}
          <div className="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 flex flex-col justify-between">
            <span className="text-sm font-mono text-gray-400 uppercase tracking-widest">Active Matches</span>
            <div className="text-5xl font-bold mt-4 text-blue-600">12</div>
          </div>

          {/* Card 3: Recent Activity */}
          <div className="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
            <h3 className="font-bold mb-4">Network Suggestions</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800" />
                  <div>
                    <p className="text-sm font-semibold">Alex Rivera</p>
                    <p className="text-xs text-gray-500">Fullstack Developer</p>
                  </div>
                  <button className="ml-auto text-xs font-bold text-blue-600 hover:underline">Connect</button>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: Upcoming Events */}
          <div className="md:col-span-2 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
            <h3 className="font-bold mb-2">Upcoming Build-Session</h3>
            <p className="text-sm text-gray-500 mb-6">Join other builders for a 2-hour deep work session.</p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-full text-sm font-bold cursor-pointer hover:opacity-90">
              Register Now
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}