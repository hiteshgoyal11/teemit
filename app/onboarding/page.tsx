"use client"
import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

const ROLES = [
  "Frontend Developer", "Backend Developer", "Fullstack Developer", 
  "UI/UX Designer", "Product Manager", "Mobile App Developer", 
  "Founder / CEO", "Data Scientist", "AI Engineer", "Web3 Developer"
]

export default function RoleStep() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [isReady, setIsReady] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false) 
  const router = useRouter()
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!, 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    // प्रीमियम फ़ेड-इन इफ़ेक्ट के लिए छोटा सा डिले
    const timer = setTimeout(() => setIsReady(true), 400)
    return () => clearTimeout(timer)
  }, [])

  // 1. Continue Logic - यह डेटाबेस में डेटा सेव करेगा
  const handleNext = async () => {
    if (!selectedRole) {
      setError(true)
      return
    }

    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ role: selectedRole })
          .eq('id', user.id)

        if (updateError) throw updateError
        
        // अगले स्टेप (Interests) पर जाएँ
        router.push('/onboarding/interests')
      }
    } catch (err) {
      console.error("Error saving role:", err)
    } finally {
      setLoading(false)
    }
  }

  // 2. Skip Logic - यह डेटाबेस में कुछ सेव नहीं करेगा, बस आगे बढ़ेगा
  const handleSkip = () => {
    router.push('/onboarding/interests')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-12 bg-white dark:bg-black text-black dark:text-white px-6 transition-colors duration-500 overflow-y-auto py-20 selection:bg-[#115488] selection:text-white">
      
      {/* मुख्य कंटेंट डिब्बा (Content Wrapper) */}
      <div className={`w-full max-w-[500px] transition-all duration-1000 ${isReady ? 'opacity-100' : 'opacity-0'}`}>
        
        <div className="flex justify-end mb-8">
          <button onClick={handleSkip} className="text-sm text-gray-500 dark:text-gray-400 hover:text-[#115488] transition-colors font-medium">
            Skip
          </button>
        </div>

        {/* 2. Step Header */}
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#115488] mb-4">
          Step 01 <span className="text-gray-300 dark:text-gray-800">/ 04</span>
        </p>
        
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 italic">What describes you best?</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
            Select your primary role to help others understand your expertise within the teemit community.
          </p>
        </header>

        {/* 3. Selection Grid (Pill Style) */}
        <div className={`flex flex-wrap gap-3 p-1 transition-all rounded-2xl ${error ? 'ring-2 ring-red-500/20' : ''}`}>
          {ROLES.map((role) => (
            <button
              key={role}
              onClick={() => {
                setSelectedRole(role)
                setError(false) // रोल चुनते ही रेड एरर हटा दें
              }}
              className={`px-5 py-2.5 rounded-full text-sm font-bold border transition-all duration-300 ${
                selectedRole === role 
                ? 'bg-[#115488] border-[#115488] text-white shadow-xl shadow-[#115488]/20 scale-105' 
                : 'bg-white dark:bg-[#0A0A0A] border-gray-100 dark:border-gray-800 text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-600'
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        {/* 4. Error Message - केवल तभी दिखेगा जब बिना चुने Continue दबाएंगे */}
        {error && (
          <div className="mt-6 flex items-center gap-2 text-red-500 animate-in fade-in slide-in-from-left-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <p className="text-[10px] font-black uppercase tracking-widest">Please select a role to continue</p>
          </div>
        )}

        {/* 5. Action Footer */}
        <footer className="mt-12">
          <button 
            onClick={handleNext}
            disabled={loading}
            className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:shadow-2xl hover:shadow-[#115488]/30 transition-all active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {loading ? 'Processing...' : 'Continue'}
          </button>
          
          <p className="mt-8 text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
            You can always update your role later from your profile settings.
          </p>
        </footer>

      </div>
    </div>
  )
}