export default function InterestsLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-12 bg-white dark:bg-black px-6 transition-colors duration-500">
      <div className="w-full max-w-[600px] space-y-12">
        
        {/* 1. Skip Button Skeleton */}
        <div className="flex justify-end">
          <div className="h-4 w-12 bg-gray-100 dark:bg-gray-900 animate-pulse rounded-md" />
        </div>

        {/* 2. Header Skeleton */}
        <div className="space-y-4">
          <div className="h-3 w-20 bg-gray-100 dark:bg-gray-900 animate-pulse rounded-full" />
          <div className="h-10 w-[70%] bg-gray-100 dark:bg-gray-900 animate-pulse rounded-xl" />
          <div className="h-4 w-[90%] bg-gray-50 dark:bg-gray-950 animate-pulse rounded-full" />
        </div>

        {/* 3. Interest Categories Skeleton */}
        {[1, 2].map((group) => (
          <div key={group} className="space-y-4">
            <div className="h-3 w-24 bg-gray-100 dark:bg-gray-900 animate-pulse rounded-full" />
            <div className="flex flex-wrap gap-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-9 w-24 bg-gray-50 dark:bg-[#0A0A0A] border border-gray-100 dark:border-gray-900 animate-pulse rounded-xl" />
              ))}
            </div>
          </div>
        ))}

        {/* 4. Button Skeleton */}
        <div className="h-14 w-full bg-gray-100 dark:bg-gray-900 animate-pulse rounded-2xl mt-12" />
      </div>
    </div>
  );
}