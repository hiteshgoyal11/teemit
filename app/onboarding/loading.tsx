export default function OnboardingLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black px-6">
      <div className="w-full max-w-[450px] space-y-10">
        <div className="space-y-4">
          <div className="h-4 w-20 bg-gray-100 dark:bg-gray-900 animate-pulse rounded-full" />
          <div className="h-10 w-64 bg-gray-100 dark:bg-gray-900 animate-pulse rounded-xl" />
          <div className="h-4 w-full bg-gray-50 dark:bg-gray-950 animate-pulse rounded-full" />
        </div>
        <div className="h-[300px] w-full bg-gray-50 dark:bg-[#0A0A0A] border border-gray-100 dark:border-gray-900 rounded-3xl animate-pulse" />
        <div className="flex gap-4">
          <div className="h-12 flex-1 bg-gray-100 dark:bg-gray-900 animate-pulse rounded-xl" />
          <div className="h-12 w-24 bg-gray-50 dark:bg-gray-950 animate-pulse rounded-xl" />
        </div>
      </div>
    </div>
  );
}