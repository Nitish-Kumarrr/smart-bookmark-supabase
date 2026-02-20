Live Demo: 🔗 https://smart-bookmark-supabase-ten.vercel.app/

GitHub Repo: 🔗 https://github.com/Nitish-Kumarrr/smart-bookmark-supabase

 **Features**
 
Authentication,
Email & Password login,
Google OAuth login,
Secure session management,
Protected dashboard routes,
Persistent login across refresh,

**Bookmark Management**

Add bookmark (title + URL),
Edit bookmark,
Delete bookmark,
Toggle favorite ⭐,
Search bookmarks (instant filtering),
Filter by favorites,
Real-time sync across tabs,

**Realtime Updates**

Supabase Realtime subscription,
Changes reflect instantly without refresh,
Works across multiple browser tabs,

**Modern UI**

Built with Tailwind CSS,
Designed using shadcn/ui components,
Responsive layout,
Clean, minimal, SaaS-style design,
Interactive states and smooth transitions,

**Problem Faced**

One of the most challenging issues I encountered was handling authentication and session consistency in Next.js App Router while integrating Supabase (Auth + RLS + Realtime).
Initially, I implemented authentication using server actions ("use server") along with Supabase’s server client. However, I also introduced client-side session management using React Context and onAuthStateChange.

**Solution**

Email/password login moved fully to client-side

Used Supabase client directly

Managed auth state via React Context

Used onAuthStateChange to keep session reactive

Google OAuth kept as server action

Fixed RLS update issue

Discovered favorites were not persisting

Identified missing UPDATE policy

Added correct RLS update rule with using + with check
