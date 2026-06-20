"use client"
import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<any>({})

  const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: any = {}
    if (!email || !/\S+@\S+\.\S+/.test(email)) newErrors.email = "Valid email is required"
    if (password.length < 6) newErrors.password = "Min 6 characters required"
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match"
    
    if (Object.keys(newErrors).length > 0) return setErrors(newErrors)

    setLoading(true)
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) setErrors({ general: error.message })
    else alert('Success! Check your email to confirm registration.')
    setLoading(false)
  }

  const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
  )
  const EyeOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/></svg>
  )

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black text-black dark:text-white px-6 relative transition-colors">
      <Link href="/login" className="absolute top-6 left-6 md:top-10 md:left-10 text-xs font-bold text-gray-400 hover:text-[#115488] flex items-center gap-1 transition-all">← Back</Link>
      
      <div className="w-full max-w-[400px]">
        <h1 className="text-4xl font-bold tracking-tighter text-center mb-10 italic">teemit<span className="text-[#115488] not-italic">.</span></h1>
        
        <form onSubmit={handleSignup} className="space-y-5">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Email</label>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className={`w-full px-4 py-3 bg-gray-50 dark:bg-[#0A0A0A] border rounded-xl focus:outline-none transition-all text-sm ${errors.email ? 'border-red-500':'border-gray-200 dark:border-gray-800 focus:border-[#115488]'}`} />
            {errors.email && <p className="text-red-500 text-[10px] ml-1">{errors.email}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Password</label>
            <div className="relative">
              <input type={showPassword ? "text":"password"} value={password} onChange={(e)=>setPassword(e.target.value)} className={`w-full px-4 py-3 bg-gray-50 dark:bg-[#0A0A0A] border rounded-xl focus:outline-none transition-all text-sm ${errors.password ? 'border-red-500':'border-gray-200 dark:border-gray-800 focus:border-[#115488]'}`} />
              <button type="button" onClick={()=>setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-400 hover:text-[#115488]">{showPassword ? <EyeOffIcon/> : <EyeIcon/>}</button>
            </div>
            {errors.password && <p className="text-red-500 text-[10px] ml-1">{errors.password}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Confirm Password</label>
            <div className="relative">
              <input type={showConfirmPassword ? "text":"password"} value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} className={`w-full px-4 py-3 bg-gray-50 dark:bg-[#0A0A0A] border rounded-xl focus:outline-none transition-all text-sm ${errors.confirmPassword ? 'border-red-500':'border-gray-200 dark:border-gray-800 focus:border-[#115488]'}`} />
              <button type="button" onClick={()=>setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-3 text-gray-400 hover:text-[#115488]">{showConfirmPassword ? <EyeOffIcon/> : <EyeIcon/>}</button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-[10px] ml-1">{errors.confirmPassword}</p>}
          </div>

          <button type="submit" disabled={loading} className="w-full py-3 bg-black dark:bg-white text-white dark:text-black rounded-xl font-bold text-sm hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 shadow-lg">
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  )
}