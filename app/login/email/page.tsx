"use client"
import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'

export default function EmailLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({})

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // 1. Eye Icons (Inline SVGs for performance)
  const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
  )
  const EyeOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/></svg>
  )

  // 2. Professional Validation Logic
  const validate = () => {
    const newErrors: typeof errors = {}
    if (!email) {
      newErrors.email = "Email address is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email format"
    }
    if (!password) {
      newErrors.password = "Password is required"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    setErrors({})

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setErrors({ general: "Invalid email or password. Please try again." })
    } else {
      window.location.href = '/home'
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black text-black dark:text-white px-6 transition-colors duration-500 relative selection:bg-[#115488] selection:text-white">
      
      {/* Back to Options - Top Left Responsive */}
      <Link 
        href="/login" 
        className="absolute top-8 left-6 md:top-12 md:left-12 text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#115488] transition-all flex items-center gap-2 group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span> 
        Back to options
      </Link>

      <div className="w-full max-w-[400px]">
        {/* Branding Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold tracking-tighter italic">teemit<span className="text-[#115488] not-italic">.</span></h1>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-3 font-medium tracking-tight">Sign in to continue your journey</p>
        </div>

        {/* Professional Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          
          {/* Email Field */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">Email Address</label>
            <input
              type="text"
              placeholder="name@company.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-5 py-3.5 bg-gray-50 dark:bg-[#0A0A0A] border rounded-2xl focus:outline-none transition-all text-sm placeholder:text-gray-300 dark:placeholder:text-gray-700 ${
                errors.email || errors.general ? 'border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.2)]' : 'border-gray-100 dark:border-gray-900 focus:border-[#115488] focus:ring-1 focus:ring-[#115488]/20'
              }`}
            />
            {errors.email && <p className="text-red-500 text-[10px] ml-1 font-bold mt-1.5 animate-in fade-in slide-in-from-top-1">{errors.email}</p>}
          </div>

          {/* Password Field with Hide/Show */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">Password</label>
            <div className="relative group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-5 py-3.5 bg-gray-50 dark:bg-[#0A0A0A] border rounded-2xl focus:outline-none transition-all text-sm pr-12 placeholder:text-gray-300 dark:placeholder:text-gray-700 ${
                  errors.password || errors.general ? 'border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.2)]' : 'border-gray-100 dark:border-gray-900 focus:border-[#115488] focus:ring-1 focus:ring-[#115488]/20'
                }`}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#115488] transition-colors p-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            
            {/* Forgot Password Link - Professional Placement */}
            <div className="flex justify-end mt-2 px-1">
              <Link 
                href="/forgot-password" 
                className="text-[10px] font-bold text-[#115488] hover:opacity-80 transition-opacity uppercase tracking-wider"
              >
                Forgot password?
              </Link>
            </div>
            {errors.password && <p className="text-red-500 text-[10px] ml-1 font-bold mt-1.5 animate-in fade-in slide-in-from-top-1">{errors.password}</p>}
          </div>

          {/* Global Error Alert */}
          {errors.general && (
            <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-2xl text-red-500 text-[11px] text-center font-bold animate-in zoom-in-95 duration-300">
              {errors.general}
            </div>
          )}

          {/* Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-4 shadow-2xl shadow-black/10 dark:shadow-white/5"
          >
            {loading ? 'Processing...' : 'Sign In'}
          </button>
        </form>

        {/* Footer Navigation */}
        <p className="mt-12 text-center text-[11px] text-gray-400 font-bold tracking-tight">
          New to teemit? <Link href="/signup" className="text-[#115488] hover:underline underline-offset-4 decoration-2">Create an account</Link>
        </p>

      </div>
    </div>
  )
}