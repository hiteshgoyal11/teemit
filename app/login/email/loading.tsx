export default function AuthLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black px-6 transition-colors duration-500">
      
      {/* Back Button Skeleton */}
      <div className="absolute top-8 left-6 md:top-12 md:left-12 w-24 h-4 bg-gray-100 dark:bg-gray-900 animate-pulse rounded-full" />

      <div className="w-full max-w-[400px] flex flex-col items-center">
        {/* Logo Skeleton */}
        <div className="h-12 w-32 bg-gray-100 dark:bg-gray-900 animate-pulse rounded-2xl mb-2" />
        <div className="h-4 w-48 bg-gray-50 dark:bg-gray-950 animate-pulse rounded-full mb-12" />

        {/* Form Fields Skeleton */}
        <div className="w-full space-y-8">
          {[1, 2].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 w-20 bg-gray-100 dark:bg-gray-900 animate-pulse rounded-full ml-1" />
              <div className="h-12 w-full bg-gray-50 dark:bg-[#0A0A0A] border border-gray-100 dark:border-gray-900 animate-pulse rounded-2xl" />
            </div>
          ))}

          {/* Button Skeleton */}
          <div className="h-14 w-full bg-gray-100 dark:bg-gray-900 animate-pulse rounded-2xl mt-4" />
        </div>

        {/* Footer Link Skeleton */}
        <div className="h-4 w-40 bg-gray-50 dark:bg-gray-950 animate-pulse rounded-full mt-12" />
      </div>
    </div>
  );
}