export default function HomeLoading() {
  // हम 3 पोस्ट्स का स्केलेटन दिखाएंगे ताकि स्क्रीन भरी हुई लगे
  const skeletonPosts = [1, 2, 3];

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-500 selection:bg-[#115488]">
      
      {/* 1. Top Navigation Skeleton */}
      <nav className="sticky top-0 z-20 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-900 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
          <div className="h-9 w-40 md:w-64 bg-gray-100 dark:bg-gray-900 rounded-xl animate-pulse" />
        </div>
        <div className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-900 animate-pulse" />
      </nav>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-8">
        
        {skeletonPosts.map((i) => (
          <div key={i} className="space-y-4 border-b border-gray-50 dark:border-gray-900 pb-8">
            
            {/* 2. Post Header (Avatar + Name) */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse" />
                <div className="h-3 w-20 bg-gray-100 dark:bg-gray-900 rounded-full animate-pulse" />
              </div>
            </div>

            {/* 3. Post Content Text Lines */}
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-100 dark:bg-gray-900 rounded-full animate-pulse" />
              <div className="h-4 w-[90%] bg-gray-100 dark:bg-gray-900 rounded-full animate-pulse" />
              <div className="h-4 w-[75%] bg-gray-100 dark:bg-gray-900 rounded-full animate-pulse" />
            </div>

            {/* 4. Large Post Image Placeholder */}
            <div className="aspect-video w-full bg-gray-50 dark:bg-[#0A0A0A] border border-gray-100 dark:border-gray-900 rounded-2xl animate-pulse" />

            {/* 5. Bottom Actions (Like, Comment, Share) */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex gap-4">
                <div className="h-4 w-12 bg-gray-100 dark:bg-gray-900 rounded-full animate-pulse" />
                <div className="h-4 w-12 bg-gray-100 dark:bg-gray-900 rounded-full animate-pulse" />
              </div>
              <div className="h-4 w-20 bg-gray-100 dark:bg-gray-900 rounded-full animate-pulse" />
            </div>

          </div>
        ))}

      </main>
    </div>
  );
}