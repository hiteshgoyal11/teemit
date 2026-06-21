import React from 'react';
import Link from 'next/link';
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

<script dangerouslySetInnerHTML={{ __html: `console.log("🟢 [BROWSER] Real Content (page.tsx) has arrived. Skeleton hidden.")` }} />

export const dynamic = 'force-dynamic';


export default async function LandingPage() {

  console.log("--- 🕵️ STEP 1: Page Execution Started ---");

  const cookieStore = await cookies()

  console.log("--- 🍪 STEP 2: Cookies Fetched successfully ---");

  // 2. फिर सुपाबेस क्लाइंट बनाओ
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
      },
    }
  )

  console.log("--- 🛠️ STEP 3: Supabase Client Created ---");

  // 3. डेटाबेस से यूज़र चेक करो (यही वो हिस्सा है जो 'loading.tsx' को ट्रिगर करेगा)
  console.log("--- ⏳ STEP 4: Database User Check Started ---");

  // 3. अब डेटाबेस से यूज़र चेक करो (सिर्फ एक बार)
  const { data: { user: authUser } } = await supabase.auth.getUser();
    console.log("--- ✅ STEP 5: Database User Check Finished ---");


    // ✅ इसकी जगह ये डालो:
    if (authUser) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('onboarding_complete')
        .eq('id', authUser.id)
        .single();

      if (profile?.onboarding_complete) {
        redirect('/home');
      } else {
        redirect('/onboarding'); // अगर ऑनबोर्डिंग नहीं हुई तो यहाँ भेजो
      }
    }

  console.log("--- 🏠 STEP 7: No User found, showing Landing Page UI ---");

  // अगर लॉगिन नहीं है, तो नीचे वाला UI रेंडर होगा
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-500 font-sans selection:bg-[#115488] selection:text-white">
      {/* Navigation */}
      <nav className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center sticky top-0 z-30 bg-white/80 dark:bg-black/80 backdrop-blur-md transition-all">
        <div className="text-xl font-bold tracking-tight italic">
          teemit<span className="text-[#115488] not-italic">.</span>
        </div>
        <Link href="/login">
          <button className="text-xs font-bold uppercase tracking-widest border border-gray-100 dark:border-gray-900 px-5 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-all active:scale-95">
            Sign In
          </button>
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 pt-16 pb-24">
        <div className="max-w-3xl">
          {/* Accent Badge */}
          <div className="inline-block px-3 py-1 mb-8 text-[10px] font-black tracking-[0.2em] uppercase border border-[#115488]/20 text-[#115488] rounded-md bg-[#115488]/5 dark:bg-[#115488]/10">
            The Builder Network
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-[0.95]">
            Connect with builders. <br />
            <span className="text-gray-400 dark:text-gray-600 font-medium italic">Build your dream team.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-12 max-w-xl leading-relaxed font-medium">
            teemit is a premium matchmaking platform for developers, designers, and founders to form high-impact teams and ship projects faster.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/login">
              <button className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-xl font-bold text-sm hover:shadow-2xl hover:shadow-[#115488]/20 transition-all hover:-translate-y-0.5 active:scale-95">
                Get Started
              </button>
            </Link>
            <Link href="/login">
              <button className="px-8 py-3 border border-gray-100 dark:border-gray-900 rounded-xl font-bold text-sm hover:bg-gray-50 dark:hover:bg-gray-900 transition-all active:scale-95">
                Learn More
              </button>
            </Link>
          </div>
        </div>

        {/* Feature Grid - Perfectly Aligned with Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-32 border-t border-gray-50 dark:border-gray-900 pt-20">
          <div>
            <h3 className="text-xs font-black mb-4 uppercase tracking-[0.2em] text-[#115488]">Verified Talent</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
              Access a curated network of elite builders. High-quality collaboration with zero noise.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-black mb-4 uppercase tracking-[0.2em] text-[#115488]">Smart Match</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
              Our system connects you with builders whose skills complement yours for maximum project success.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-black mb-4 uppercase tracking-[0.2em] text-[#115488]">Privacy First</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
              Secure Google OAuth verification ensures a trusted and safe network of real human builders.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-12 border-t border-gray-50 dark:border-gray-900 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          © 2024 teemit. Built for the world&apos;s best builders.
        </p>
        <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-gray-500">
          <Link href="/privacy" className="hover:text-[#115488] transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-[#115488] transition-colors">Terms of Service</Link>
        </div>
      </footer>
    </div>
  );
}