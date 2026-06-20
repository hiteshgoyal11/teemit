export default function LoginLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black px-6 transition-colors duration-500">
      
      <div className="w-full max-w-[400px] text-center flex flex-col items-center">
        {/* 1. Logo Skeleton */}
        <div className="h-10 w-32 bg-gray-100 dark:bg-gray-900 animate-pulse rounded-xl mb-3" />
        
        {/* 2. Subtitle Skeleton */}
        <div className="h-4 w-48 bg-gray-50 dark:bg-gray-950 animate-pulse rounded-full mb-12" />

        {/* Google Button Skeleton - 1:1 Match */}
        <div className="w-full flex justify-center mb-6 h-[44px]">
          <div className="w-[360px] h-[44px] bg-gray-100 dark:bg-gray-900 animate-pulse rounded-full" />
        </div>

        {/* Email Link Skeleton gap matching */}
        <div className="h-4 w-36 bg-gray-50 dark:bg-gray-950 animate-pulse rounded-full mb-12" />

        {/* 5. Footer Links Skeleton */}
        <div className="space-y-2 flex flex-col items-center">
          <div className="h-2.5 w-40 bg-gray-100 dark:bg-gray-900 animate-pulse rounded-full" />
          <div className="h-2.5 w-32 bg-gray-100 dark:bg-gray-900 animate-pulse rounded-full opacity-60" />
        </div>
      </div>

    </div>
  );
}