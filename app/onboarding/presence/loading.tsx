export default function PresenceLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-12 bg-white dark:bg-black px-6">
      <div className="w-full max-w-[450px] space-y-10">
        <div className="flex justify-end"><div className="h-4 w-12 bg-gray-100 dark:bg-gray-900 animate-pulse rounded-md" /></div>
        <div className="space-y-4">
          <div className="h-3 w-20 bg-gray-100 dark:bg-gray-900 animate-pulse rounded-full" />
          <div className="h-10 w-[80%] bg-gray-100 dark:bg-gray-900 animate-pulse rounded-xl" />
        </div>
        <div className="space-y-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-12 w-full bg-gray-50 dark:bg-[#0A0A0A] border border-gray-100 dark:border-gray-900 animate-pulse rounded-xl" />
          ))}
        </div>
        <div className="h-14 w-full bg-gray-100 dark:bg-gray-900 animate-pulse rounded-2xl" />
      </div>
    </div>
  );
}