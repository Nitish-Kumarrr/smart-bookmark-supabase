"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Check, X, Trash2, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface Bookmark {
  id: string;
  title: string;
  url: string;
  created_at: string;
  is_favorite: boolean;
}

interface BookmarkProps {
  bookmark: Bookmark;
  setBookmarks: React.Dispatch<React.SetStateAction<Bookmark[]>>;
}

export default function BookmarkItem({ bookmark, setBookmarks }: BookmarkProps) {
  const supabase = createClient();

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(bookmark.title);
  const [editUrl, setEditUrl] = useState(bookmark.url);

  // ⭐ Toggle Favorite
  const toggleFavorite = async () => {
    const newValue = !bookmark.is_favorite;

    const { error } = await supabase
    .from("bookmarks")
    .update({ is_favorite: newValue })
    .eq("id", bookmark.id)
    .select();

  if (error) {
    console.error("Favorite update failed:", error.message);
    return;
  }

    setBookmarks((prev) =>
      prev.map((item) =>
        item.id === bookmark.id
          ? { ...item, is_favorite: newValue }
          : item
      )
    );
  };

  const handleDelete = async () => {
    await supabase.from("bookmarks").delete().eq("id", bookmark.id);

    setBookmarks((prev) =>
      prev.filter((item) => item.id !== bookmark.id)
    );
  };

  const handleUpdate = async () => {
    const { error } = await supabase
      .from("bookmarks")
      .update({ title: editTitle, url: editUrl })
      .eq("id", bookmark.id);

    if (!error) {
      setBookmarks((prev) =>
        prev.map((item) =>
          item.id === bookmark.id
            ? { ...item, title: editTitle, url: editUrl }
            : item
        )
      );
    }

    setIsEditing(false);
  };

  return (
    <div className="relative group border rounded-2xl p-6 bg-white shadow-sm hover:shadow-lg transition-all duration-200">

      {!isEditing && <button
        onClick={toggleFavorite}
        className="absolute top-4 right-4"
      >
        <Star
          className={cn(
            "w-5 h-5 transition-all",
            bookmark.is_favorite
              ? "fill-yellow-400 text-yellow-400 scale-110"
              : "text-gray-300 hover:text-yellow-400"
          )}
        />
      </button>}

      <div className="flex flex-col gap-3">
        {isEditing ? (
          <>
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <Input
              value={editUrl}
              onChange={(e) => setEditUrl(e.target.value)}
            />
          </>
        ) : (
          <>
            <p className="font-semibold text-lg tracking-tight">
              {bookmark.title}
            </p>

            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-sm hover:underline break-all"
            >
              {bookmark.url}
            </a>
          </>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          {isEditing ? (
            <>
              <Button size="sm" onClick={handleUpdate}>
                <Check className="w-4 h-4 mr-1" />
                Save
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                <X className="w-4 h-4 mr-1" />
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsEditing(true)}
              >
                <Pencil className="w-4 h-4 mr-1" />
                Edit
              </Button>

              <Button
                size="sm"
                variant="destructive"
                onClick={handleDelete}
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
