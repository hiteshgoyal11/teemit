import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import LoginPageClient from './login-client'

export const dynamic = 'force-dynamic';

export default async function LoginPage() {
  // --- 🛑 TEST DELAY (स्केलेटन देखने के लिए) ---
  // जब टेस्टिंग पूरी हो जाए, तो नीचे वाली लाइन हटा देना
  await new Promise((resolve) => setTimeout(resolve, 2500));
  
  const cookieStore = await cookies();
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
      },
    }
  );

  // 1. सर्वर पर चेक करो कि क्या यूज़र पहले से लॉगिन है?
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    // 2. 🕵️ अब डेटाबेस से पूछो: "क्या इसकी ऑनबोर्डिंग हो चुकी है?"
    const { data: profile } = await supabase
      .from('profiles')
      .select('onboarding_complete')
      .eq('id', user.id)
      .single();

    // 3. प्रोफेशनल डिसीजन (Professional Decision)
    if (profile?.onboarding_complete) {
      // अगर ऑनबोर्डिंग हो गई है -> सीधे फीड (Home) पर भेजो
      redirect('/home');
    } else {
      // अगर प्रोफाइल अधूरी है या नया यूज़र है -> Onboarding पर भेजो
      redirect('/onboarding');
    }
  }

  // अगर यूज़र लॉगिन नहीं है, तो लॉगिन स्क्रीन दिखाओ
  return <LoginPageClient />;
}