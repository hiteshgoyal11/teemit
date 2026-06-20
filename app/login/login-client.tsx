"use client"
import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'

export const dynamic = 'force-dynamic';

export default function LoginPage() {
  const [isReady, setIsReady] = useState(false); // शुरुआत में 'false' रहेगा
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    const initializeGoogle = () => {
      if (typeof window !== 'undefined' && (window as any).google) {
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        (window as any).google.accounts.id.initialize({
          client_id: "999598918578-dkjg7u7h8qim6l47itsjrgeqmbe3mj8g.apps.googleusercontent.com",
          callback: async (response: any) => {
            const { error } = await supabase.auth.signInWithIdToken({
              provider: 'google',
              token: response.credential,
            })
            if (!error) {
              // 🛑 सीधा /home मत भेजो, पेज रिफ्रेश करो ताकि 'Middleware' या 'route.ts' अपना काम करे
              window.location.reload(); 
            }
          },
        });

        (window as any).google.accounts.id.renderButton(
          document.getElementById("google-signin-btn"),
          { 
            theme: isDarkMode ? "filled_black" : "outline", 
            size: "large", 
            width: window.innerWidth < 400 ? "280" : "360", 
            shape: "pill", 
            text: "continue_with" 
          }
        );
        setTimeout(() => setIsReady(true), 500);
      }
    }

    const checkScript = setInterval(() => {
      if ((window as any).google) {
        initializeGoogle()
        clearInterval(checkScript)
      }
    }, 500)
    return () => clearInterval(checkScript)
  }, [supabase])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black text-black dark:text-white px-6 transition-colors duration-300 relative overflow-hidden">
      {/* 🕵️ DEBUG ALERT: स्केलेटन के लिए */}
      <script dangerouslySetInnerHTML={{ __html: `console.log("Rendering LoginPage...")` }} />

      {/* 1. LOCAL SKELETON - यह पूरी स्क्रीन पर तब तक रहेगा जब तक isReady सच न हो जाए */}
      {!isReady && (
        <div className="absolute inset-0 z-50 bg-white dark:bg-black flex flex-col items-center justify-center space-y-12 transition-opacity duration-500">
          <div className="h-10 w-32 bg-gray-100 dark:bg-gray-900 animate-pulse rounded-xl" />
          <div className="w-[360px] h-[44px] bg-gray-100 dark:bg-gray-900 animate-pulse rounded-full" />
          <div className="h-4 w-40 bg-gray-50 dark:bg-gray-950 animate-pulse rounded-full" />
        </div>
      )}

      {/* 🟢 2. REAL UI WRAPPER - अब सारा कंटेंट इसके अंदर है */}
      <div className={`w-full max-w-[400px] text-center flex flex-col items-center transition-all duration-1000 ${isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        
        {/* 1. Logo Section */}
        <h1 className="text-4xl font-bold tracking-tighter mb-2 italic">
          teemit<span className="text-[#115488] not-italic">.</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-12 italic">
          Build your dream team in seconds.
        </p>

        {/* Google Button Container - Stacked logic for seamless transition */}
        <div className="w-full flex justify-center mb-6 h-[44px] relative"> 
          
          {/* Background Skeleton - यह पीछे चमकता रहेगा जब तक असली बटन न आ जाए */}
          {!isReady && (
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
              <div className="w-[360px] h-[44px] bg-gray-100 dark:bg-gray-900 animate-pulse rounded-full" />
            </div>
          )}

          {/* Actual Google Button - यह isReady होने पर धीरे से प्रकट होगा */}
          <div 
            id="google-signin-btn" 
            className={`flex justify-center items-center transition-opacity duration-1000 ${isReady ? 'opacity-100' : 'opacity-0'}`}
            style={{ height: '44px', width: '360px' }}
          ></div>
        </div>

        {/* ईमेल बटन */}
        <Link href="/login/email">
          <button className="text-[#115488] font-bold text-sm flex items-center justify-center gap-2 mx-auto hover:underline mb-12 transition-all">
            Continue with email <span>→</span>
          </button>
        </Link>

        {/* 4. Footer Links */}
        <div className="space-y-1">
          <p className="text-[10px] text-gray-400 leading-relaxed uppercase tracking-widest font-bold">
            By continuing, you agree to our
          </p>
          <div className="flex justify-center gap-1 text-[10px] font-bold uppercase tracking-widest">
            <Link href="/terms" className="text-gray-600 dark:text-gray-300 underline hover:text-[#115488]">Terms</Link>
            <span className="text-gray-400 no-underline">and</span>
            <Link href="/privacy" className="text-gray-600 dark:text-gray-300 underline hover:text-[#115488]">Privacy</Link>
          </div>
        </div>

      </div> {/* 🟢 REAL UI WRAPPER यहाँ बंद होता है */}
    </div>
  )
}