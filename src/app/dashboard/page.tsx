"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import AddBookmarkForm from "@/components/AddBookmarkForm";
import BookmarkList from "@/components/BookmarkList";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Bookmark {
  id: string;
  title: string;
  url: string;
  created_at: string;
  is_favorite: boolean;
}

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const supabase = createClient();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [search, setSearch] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/");
    }
  }, [user, loading]);

  useEffect(() => {
    if (!user) return;

    const fetchBookmarks = async () => {
      const { data } = await supabase
        .from("bookmarks")
        .select("*")
        .order("created_at", { ascending: false });

      setBookmarks(data || []);
    };

    fetchBookmarks();
  }, [user]);

  const filteredBookmarks = useMemo(() => {
  return bookmarks
    .filter((bookmark) =>
      bookmark.title.toLowerCase().includes(search.toLowerCase()) ||
      bookmark.url.toLowerCase().includes(search.toLowerCase())
    )
    .filter((bookmark) =>
      showFavorites ? bookmark.is_favorite : true
    );
}, [bookmarks, search, showFavorites]);
  if (loading || !user) return null;


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-20 px-6 space-y-12">

        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            Welcome back {user.email}
          </h1>
          <p className="text-gray-500">
            Manage your bookmarks efficiently and beautifully.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <AddBookmarkForm setBookmarks={setBookmarks} />
        </div>
        {/* 🔥 Premium Search Bar */}
        <div className="w-full">

          <div className="relative max-w-2xl">

            {/* Search Input */}
            <Input
              placeholder="Search bookmarks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 rounded-2xl pl-12 pr-14 border-gray-200 focus-visible:ring-2 focus-visible:ring-blue-500 shadow-sm transition-all"
            />

            {/* Search Icon (Left) */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </div>

            {/* ⭐ Favorite Toggle Inside Input */}
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className="absolute right-3 top-1/2 -translate-y-1/2 transition-all"
            >
              <span
                className={`text-xl ${showFavorites
                    ? "text-yellow-400 scale-110"
                    : "text-gray-300 hover:text-yellow-400"
                  }`}
              >
                ★
              </span>
            </button>

          </div>

        </div>




        <BookmarkList bookmarks={filteredBookmarks} setBookmarks={setBookmarks} />
      </div>
    </div>

  );
}
