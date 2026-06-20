import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function HomePage() {
  const cookieStore = await cookies()
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
      },
    }
  )

  // असली यूज़र डेटा प्राप्त करें
  const { data: { user } } = await supabase.auth.getUser()

  // अगर लॉगिन नहीं है, तो वापस लॉगिन पेज पर भेजें
  if (!user) {
    redirect('/login')
  }

  // डमी फीड डेटा (इसे बाद में आप डेटाबेस टेबल से बदल सकते हैं)
  const posts = [
    { 
      id: 1, 
      author: user.user_metadata.full_name || user.email?.split('@')[0] || 'Builder', 
      role: 'Software Engineer', 
      content: 'Building the future of matchmaking for developers. Looking for early feedback on teemit!', 
      time: '2h ago' 
    },
    { 
      id: 2, 
      author: 'Alex Rivera', 
      role: 'Product Designer', 
      content: 'Just finished the new dark mode UI. Minimalism is the key to focus.', 
      time: '5h ago' 
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-500 font-sans selection:bg-[#115488] selection:text-white">
      
      {/* 1. Top Navigation (Matches Skeleton) */}
      <nav className="sticky top-0 z-30 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-900 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* User Avatar Circle */}
          <div className="w-9 h-9 rounded-full bg-[#115488] flex items-center justify-center text-white font-black text-xs uppercase tracking-tighter">
            {user.email?.[0]}
          </div>
          {/* Search Bar Placeholder */}
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Search builders..." 
              className="h-9 w-40 md:w-64 bg-gray-50 dark:bg-[#0A0A0A] border border-gray-100 dark:border-gray-800 rounded-xl px-4 text-xs focus:outline-none focus:border-[#115488] transition-all"
            />
          </div>
        </div>
        
        {/* Notification/Action Button */}
        <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-800 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
        </button>
      </nav>

      {/* 2. Main Feed Section */}
      <main className="max-w-2xl mx-auto px-4 py-8 space-y-12">
        
        {posts.map((post) => (
          <div key={post.id} className="group space-y-5 border-b border-gray-50 dark:border-gray-900 pb-12 last:border-0 transition-all">
            
            {/* Post Header (Avatar + Identity) */}
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center font-black text-[#115488] text-sm italic">
                {post.author[0]}
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-tight group-hover:text-[#115488] transition-colors">{post.author}</h3>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">{post.role} • {post.time}</p>
              </div>
            </div>

            {/* Post Content */}
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 font-medium">
              {post.content}
            </p>

            {/* Visual Placeholder (Matches Skeleton aspect-video) */}
            <div className="aspect-video w-full bg-gray-50 dark:bg-[#0A0A0A] border border-gray-100 dark:border-gray-900 rounded-2xl flex items-center justify-center group-hover:border-[#115488]/30 transition-all overflow-hidden relative">
               <span className="text-[10px] font-black text-gray-200 dark:text-gray-800 uppercase tracking-[0.4em] z-10">Project Showcase</span>
               <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-100/50 dark:to-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex gap-8">
                <button className="text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-[#115488] transition-colors flex items-center gap-2 group/btn">
                  <span>Connect</span>
                  <span className="opacity-0 group-hover/btn:opacity-100 transition-opacity">→</span>
                </button>
                <button className="text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-[#115488] transition-colors">Share</button>
              </div>
              <p className="text-[10px] font-bold text-gray-300 dark:text-gray-700 italic group-hover:text-gray-400 transition-colors">Send a direct message</p>
            </div>

          </div>
        ))}

        {/* Footer Info */}
        <footer className="pt-20 pb-12 text-center border-t border-gray-50 dark:border-gray-900">
           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 dark:text-gray-800">End of your feed</p>
        </footer>

      </main>
    </div>
  )
}