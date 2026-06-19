import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    // 1. Next.js 15 में cookies() async है, इसलिए await का इस्तेमाल करें
    const cookieStore = await cookies()
    
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch {
              // Server component से setAll कॉल होने पर इसे इग्नोर किया जा सकता है
            }
          },
        },
      }
    )

    // 2. Google से मिले कोड को Session में बदलें
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // सफ़ल होने पर onboarding पर भेजें
      return NextResponse.redirect(`${origin}/onboarding`)
    }
  }

  // अगर एरर आता है तो होमपेज या एरर पेज पर भेजें
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}