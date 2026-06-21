import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import InterestsClient from './interests-client'

export const dynamic = 'force-dynamic';

export default async function InterestsPage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll() { return cookieStore.getAll() } } }
  );

  // सर्वर चेक (यही इंतज़ार स्केलेटन दिखाएगा)
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  return <InterestsClient />;
}