"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import BookmarkItem from "./BookmrkItem";
interface Bookmark {
  id: string;
  title: string;
  url: string;
  created_at: string;
  is_favorite: boolean;

}

interface BookmarkProps {
  bookmarks: Bookmark[];
  setBookmarks: React.Dispatch<React.SetStateAction<Bookmark[]>>;
}

export default function BookmarkList({bookmarks, setBookmarks}:BookmarkProps) {
  const supabase = createClient();

  const fetchBookmarks = async () => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false });

    setBookmarks(data || []);
  };

  useEffect(() => {
    fetchBookmarks();

    const channel = supabase
      .channel("bookmarks-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookmarks" },
        () => fetchBookmarks()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (bookmarks.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p className="text-lg">No bookmarks yet</p>
        <p className="text-sm mt-2">Start adding your favorite links 🚀</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {bookmarks.map((bookmark) => (
        <BookmarkItem
          key={bookmark.id}
          bookmark={bookmark}
          setBookmarks={setBookmarks}
        />
      ))}
    </div>
  );
}
