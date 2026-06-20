export default function LandingLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-500">

      
      {/* 1. Navigation Skeleton (Matches Landing Nav) */}
      <nav className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
        {/* Logo Pulse */}
        <div className="flex items-center gap-1">
          <div className="h-6 w-20 bg-gray-100 dark:bg-gray-900 rounded-lg animate-pulse" />
          <div className="h-2 w-2 bg-[#115488] rounded-full animate-pulse" />
        </div>
        {/* Sign In Button Pulse */}
        <div className="h-9 w-24 bg-gray-50 dark:bg-[#0A0A0A] border border-gray-100 dark:border-gray-900 rounded-lg animate-pulse" />
      </nav>

      {/* 2. Hero Section Skeleton */}
      <main className="max-w-6xl mx-auto px-6 pt-16 pb-24">
        <div className="max-w-3xl space-y-8">
          
          {/* Badge Pulse */}
          <div className="h-6 w-32 bg-gray-100 dark:bg-gray-900 rounded-md animate-pulse border border-gray-100 dark:border-gray-800" />
          
          {/* Main Title Pulse (Big lines) */}
          <div className="space-y-4">
            <div className="h-12 w-[85%] bg-gray-100 dark:bg-gray-900 rounded-xl animate-pulse" />
            <div className="h-12 w-[65%] bg-gray-50 dark:bg-gray-950 rounded-xl animate-pulse opacity-50" />
          </div>
          
          {/* Description Pulse */}
          <div className="space-y-3 pt-4">
            <div className="h-4 w-[95%] bg-gray-100 dark:bg-gray-900 rounded-full animate-pulse" />
            <div className="h-4 w-[75%] bg-gray-100 dark:bg-gray-900 rounded-full animate-pulse" />
          </div>

          {/* Action Buttons Pulse */}
          <div className="flex gap-4 pt-4">
            <div className="h-11 w-32 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
            <div className="h-11 w-32 bg-gray-50 dark:bg-[#0A0A0A] border border-gray-100 dark:border-gray-900 rounded-xl animate-pulse" />
          </div>
        </div>

        {/* 3. Feature Grid Skeleton (Responsive 1 to 3 columns) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-32 border-t border-gray-50 dark:border-gray-900 pt-20">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              {/* Feature Title */}
              <div className="h-3 w-24 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse tracking-widest" />
              {/* Feature Description Lines */}
              <div className="space-y-2">
                <div className="h-3 w-full bg-gray-100 dark:bg-gray-900 rounded-full animate-pulse" />
                <div className="h-3 w-[80%] bg-gray-100 dark:bg-gray-900 rounded-full animate-pulse opacity-60" />
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 4. Footer Skeleton */}
      <footer className="max-w-6xl mx-auto px-6 py-12 border-t border-gray-50 dark:border-gray-900 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="h-3 w-40 bg-gray-100 dark:bg-gray-900 rounded-full animate-pulse" />
        <div className="flex gap-8">
          <div className="h-3 w-16 bg-gray-100 dark:bg-gray-900 rounded-full animate-pulse" />
          <div className="h-3 w-16 bg-gray-100 dark:bg-gray-900 rounded-full animate-pulse" />
        </div>
      </footer>

    </div>
  );
}