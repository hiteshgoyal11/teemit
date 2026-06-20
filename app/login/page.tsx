import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import LoginPageClient from './login-client'

export const dynamic = 'force-dynamic';

export default async function LoginPage() {
  await new Promise((resolve) => setTimeout(resolve, 4000));
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

  // सर्वर पर यूज़र चेक होगा, इसी दौरान Skeleton (loading.tsx) दिखेगी
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    redirect('/home');
  }

  return (
    <>
      {/* जैसे ही असली पेज आएगा, यह अलर्ट बजेगा */}
      <LoginPageClient />
    </>
  );
}