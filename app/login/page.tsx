"use client"
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'

export default function LoginPage() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      <div className="w-full max-w-[400px] text-center">
        {/* Logo */}
        <h1 className="text-4xl font-bold tracking-tighter mb-2">
          teemit<span className="text-blue-500">.</span>
        </h1>
        <p className="text-gray-500 text-sm mb-12">Build your dream team in seconds.</p>

        {/* Google Button */}
        <button 
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all mb-6 font-medium text-sm"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="G" />
          Continue with Google
        </button>

        {/* Email Link */}
        <button className="text-blue-600 font-semibold text-sm flex items-center justify-center gap-2 mx-auto hover:underline mb-20">
          Continue with email <span className="text-lg">→</span>
        </button>

        {/* Footer Text */}
        <p className="text-[10px] text-gray-400 leading-relaxed">
          By continuing, you agree to our <br />
          <Link href="/terms" className="underline font-medium text-gray-600">Terms of Service</Link> and <Link href="/privacy" className="underline font-medium text-gray-600">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  )
}