"use client"
import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/auth/callback` })
    setSent(true)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black px-6">
      <div className="w-full max-w-[400px] text-center">
        <h1 className="text-2xl font-bold tracking-tighter mb-2 italic">Reset Password</h1>
        <p className="text-gray-500 text-sm mb-8 italic">Enter your email to receive a reset link.</p>
        {!sent ? (
          <form onSubmit={handleReset} className="space-y-4 text-left">
            <input type="email" required placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0A0A0A] border border-gray-200 dark:border-gray-800 rounded-xl text-sm" />
            <button type="submit" className="w-full py-3 bg-black dark:bg-white text-white dark:text-black rounded-xl font-bold text-sm">Send Link</button>
          </form>
        ) : (
          <div className="p-4 bg-green-50 text-green-600 rounded-xl text-xs font-bold italic">Check your inbox for instructions!</div>
        )}
        <Link href="/login/email" className="mt-8 inline-block text-xs font-bold text-[#115488] hover:underline italic underline decoration-2 offset-4">Back to Login</Link>
      </div>
    </div>
  )
}