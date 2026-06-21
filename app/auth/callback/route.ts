import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const cookieStore = await cookies()
    
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll() },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch {}
          },
        },
      }
    )

    // 1. कोड को असली 'Session' में बदलें
    const { data: authData, error: authError } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!authError && authData.user) {
      // 2. 🛑 रीयल-टाइम चेक: क्या इस यूज़र की प्रोफाइल और ऑनबोर्डिंग पूरी है?
      const { data: profile } = await supabase
        .from('profiles')
        .select('onboarding_complete')
        .eq('id', authData.user.id)
        .single()

      // 3. प्रोफेशनल रीडायरेक्ट लॉजिक
      if (profile?.onboarding_complete) {
        return NextResponse.redirect(`${origin}/home`)
      }

      // अगर प्रोफाइल नहीं है या ऑनबोर्डिंग 'false' है -> /onboarding
      // return NextResponse.redirect(`${origin}/onboarding`)

      // Redirect को रोककर डेटा स्क्रीन पर प्रिंट करो
      return NextResponse.json({ 
        msg: "🕵️ DEBUG REPORT",
        user_id: authData.user.id,
        profile_found: !!profile,
        onboarding_status: profile?.onboarding_complete 
      });
    }
  }

  // अगर कुछ भी गलत होता है, तो वापस लैंडिंग पेज पर भेजें
  return NextResponse.redirect(`${origin}`)
}