"use client"
import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

export default function WelcomeStep() {
  const [name, setName] = useState('')
  const [isReady, setIsReady] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  
  const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

  useEffect(() => {
    async function getUserData() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        // गूगल से नाम फेच किया
        setName(user.user_metadata.full_name || '')
      }
      setTimeout(() => setIsReady(true), 600) // स्मूथ फेड के लिए
    }
    getUserData()
  }, [])

  const handleNext = async () => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase.from('profiles').update({ full_name: name }).eq('id', user.id)
      router.push('/onboarding/interests')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black text-black dark:text-white px-6 relative overflow-hidden transition-colors duration-500">
      
      {/* Background Fade Layer */}
      <div className={`w-full max-w-[450px] transition-all duration-1000 transform ${isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        
        <header className="mb-12">
          <p className="text-[#115488] font-black text-[10px] uppercase tracking-[0.3em] mb-3">Step 01/04</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Welcome to <span className="italic">teemit.</span></h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">Let&apos;s start with how you&apos;d like to be called in the community.</p>
        </header>

        <div className="space-y-8 bg-gray-50/50 dark:bg-[#0A0A0A]/50 border border-gray-100 dark:border-gray-900 p-8 rounded-[32px] backdrop-blur-sm">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Your Full Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl px-5 py-4 focus:outline-none focus:border-[#115488] transition-all font-medium"
            />
          </div>
        </div>

        <footer className="mt-12 flex items-center gap-4">
          <button 
            onClick={handleNext}
            disabled={loading}
            className="flex-1 bg-black dark:bg-white text-white dark:text-black py-4 rounded-2xl font-bold text-sm hover:shadow-2xl hover:shadow-[#115488]/20 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Continue'}
          </button>
          <button 
            onClick={() => router.push('/onboarding/interests')}
            className="px-6 py-4 text-gray-400 font-bold text-sm hover:text-[#115488] transition-colors"
          >
            Skip
          </button>
        </footer>
      </div>
    </div>
  )
}