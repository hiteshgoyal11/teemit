"use client"
import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function PresenceClient() {
  const [links, setLinks] = useState({ github: '', twitter: '', portfolio: '', bio: '' })
  const [errors, setErrors] = useState<any>({})
  const [isReady, setIsReady] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  
  const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

  useEffect(() => {
    setTimeout(() => setIsReady(true), 500)
  }, [])

  const validateURL = (url: string) => {
    if (!url) return true; // Empty is fine because it's skippable
    return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/.test(url);
  }

  const handleNext = async () => {
    const newErrors: any = {}
    if (links.github && !validateURL(links.github)) newErrors.github = "Invalid URL"
    if (links.twitter && !validateURL(links.twitter)) newErrors.twitter = "Invalid URL"
    if (links.portfolio && !validateURL(links.portfolio)) newErrors.portfolio = "Invalid URL"

    if (Object.keys(newErrors).length > 0) return setErrors(newErrors)

    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase.from('profiles').update({
        github_url: links.github,
        twitter_url: links.twitter,
        portfolio_url: links.portfolio,
        bio: links.bio
      }).eq('id', user.id)
      router.push('/onboarding/photo') // अगला स्टेप
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-12 bg-white dark:bg-black text-black dark:text-white px-6 transition-colors duration-500 overflow-y-auto pb-20">
      
      <div className={`w-full max-w-[450px] transition-all duration-1000 transform ${isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        
        <div className="flex justify-end mb-10">
          <button onClick={() => router.push('/onboarding/photo')} className="text-sm text-gray-500 dark:text-gray-400 hover:text-[#115488] font-medium transition-colors">Skip</button>
        </div>

        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#115488] mb-4">Step 03 / 04</p>
        
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 italic">Your Digital Presence.</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">Showcase your work and let other builders find you.</p>
        </header>

        <div className="space-y-5">
          {[
            { id: 'github', label: 'GitHub URL', placeholder: 'https://github.com/username' },
            { id: 'twitter', label: 'Twitter (X) URL', placeholder: 'https://x.com/username' },
            { id: 'portfolio', label: 'Portfolio / Website', placeholder: 'https://yourwork.com' }
          ].map((field) => (
            <div key={field.id} className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">{field.label}</label>
              <input 
                type="text" 
                placeholder={field.placeholder}
                value={(links as any)[field.id]}
                onChange={(e) => {
                  setLinks({...links, [field.id]: e.target.value})
                  setErrors({...errors, [field.id]: null})
                }}
                className={`w-full bg-gray-50 dark:bg-[#0A0A0A] border rounded-xl px-4 py-3 focus:outline-none transition-all text-sm ${errors[field.id] ? 'border-red-500' : 'border-gray-200 dark:border-gray-800 focus:border-[#115488]'}`}
              />
            </div>
          ))}

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Short Bio</label>
            <textarea 
              placeholder="What are you building?"
              value={links.bio}
              onChange={(e) => setLinks({...links, bio: e.target.value})}
              className="w-full bg-gray-50 dark:bg-[#0A0A0A] border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:border-[#115488] transition-all text-sm h-24 resize-none"
            />
          </div>
        </div>

        <footer className="mt-12">
          <button 
            onClick={handleNext} 
            disabled={loading}
            className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:shadow-2xl hover:shadow-[#115488]/30 transition-all active:scale-[0.97] shadow-lg disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Continue'}
          </button>
        </footer>
      </div>
    </div>
  )
}