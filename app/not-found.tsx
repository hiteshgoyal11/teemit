import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black text-black dark:text-white px-6 transition-colors duration-500">
      <h1 className="text-9xl font-black italic tracking-tighter opacity-10">404</h1>
      <div className="text-center -mt-12">
        <h2 className="text-2xl font-bold mb-2 italic">Lost in space?</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">The page you're looking for doesn't exist.</p>
        <Link href="/" className="px-6 py-2.5 bg-[#115488] text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all inline-block">
          Return Home
        </Link>
      </div>
    </div>
  )
}