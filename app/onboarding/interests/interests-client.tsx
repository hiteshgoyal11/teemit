"use client"
import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

// इंटरेस्ट कैटेगरीज (Categories like your reference image)
const INTEREST_CATEGORIES = [
  {
    name: "Tech & Dev",
    items: ["AI / ML", "SaaS", "Web3 & Crypto", "Mobile Apps", "Open Source", "Cybersecurity"]
  },
  {
    name: "Business",
    items: ["Product Growth", "Venture Capital", "Marketing", "E-commerce", "No-code"]
  },
  {
    name: "Design & Creative",
    items: ["UI / UX Design", "Motion Graphics", "3D Art", "Branding", "Content Strategy"]
  }
]

export default function InterestsStep() {
  const [selected, setSelected] = useState<string[]>([])
  const [isReady, setIsReady] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const router = useRouter()
  
  const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

  useEffect(() => {
    setTimeout(() => setIsReady(true), 500)
  }, [])

  const toggleInterest = (item: string) => {
    setError(false)
    if (selected.includes(item)) {
      setSelected(selected.filter(i => i !== item))
    } else {
      setSelected([...selected, item])
    }
  }

  const handleNext = async () => {
    // 1. अगर कुछ नहीं चुना, तो लाल एरर दिखाओ और रुक जाओ
    if (selected.length === 0) {
        setError(true)
        return
    }

    setLoading(true)
    try {
        const { data: { user } } = await supabase.auth.getUser()

        if (user) {
        // 2. डेटाबेस में इंटरेस्ट्स का एरे (Array) सेव करें
        const { error: updateError } = await supabase
            .from('profiles')
            .update({ interests: selected })
            .eq('id', user.id)

        if (updateError) throw updateError

        // 3. सफल होने पर अगले स्टेप (Links & Bio) पर भेजें
        router.push('/onboarding/presence') 
        }
    } catch (err) {
        console.error("Error saving interests:", err)
        // यहाँ आप चाहें तो एक 'General Error' अलर्ट दिखा सकते हैं
    } finally {
        setLoading(false)
    }
    }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-12 bg-white dark:bg-black text-black dark:text-white px-6 transition-colors duration-500 overflow-y-auto py-20">
  
        {/* 1. यह मुख्य कंटेनर है जो कंटेंट की चौड़ाई तय करता है */}
        <div className={`w-full max-w-[500px] transition-all duration-1000 ${isReady ? 'opacity-100' : 'opacity-0'}`}>
            
            {/* 2. Skip बटन अब इसी डिब्बे के अंदर सबसे ऊपर रहेगा और साथ में स्क्रॉल होगा */}
            <div className="flex justify-end mb-10">
                <button 
                    onClick={() => router.push('/onboarding/role')} 
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-[#115488] transition-colors font-medium"
                >
                    Skip
                </button>
            </div>

            {/* Content Wrapper */}
            <div className={`w-full max-w-[600px] transition-all duration-1000 transform ${isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#115488] mb-4 text-center md:text-left">Step 02 / 04</p>
                
                <header className="mb-12 text-center md:text-left">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3 italic">What fuels your curiosity?</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                    Select at least one interest to personalize your feed.
                </p>
                </header>

                {/* Categories Section */}
                <div className={`space-y-10 p-2 transition-all rounded-3xl ${error ? 'ring-2 ring-red-500/20' : ''}`}>
                {INTEREST_CATEGORIES.map((category) => (
                    <div key={category.name} className="space-y-4">
                    <h3 className="text-[11px] text-sm font-medium tracking-[0.2em] text-gray-400 ml-1">
                        {category.name}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {category.items.map((item) => (
                        <button
                            key={item}
                            onClick={() => toggleInterest(item)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all duration-300 ${
                            selected.includes(item) 
                            ? 'bg-[#115488] border-[#115488] text-white shadow-lg shadow-[#115488]/10' 
                            : 'bg-white dark:bg-[#0A0A0A] border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-600'
                            }`}
                        >
                            {item}
                        </button>
                        ))}
                    </div>
                    </div>
                ))}
                </div>

                {/* Validation Error */}
                {error && (
                <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-6 text-center animate-pulse">
                    Please pick at least one topic
                </p>
                )}

                <footer className="mt-16 sticky bottom-0 bg-white/80 dark:bg-black/80 py-4 backdrop-blur-md">
                <button 
                    onClick={handleNext}
                    disabled={loading}
                    className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:shadow-2xl hover:shadow-[#115488]/20 transition-all active:scale-95 disabled:opacity-50"
                >
                    {loading ? 'Processing...' : 'Continue'}
                </button>
                </footer>

            </div>
        </div>
    </div>
  )
}