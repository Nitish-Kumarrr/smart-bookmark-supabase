"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";

export default function AddBookmarkForm({ setBookmarks }: any) {
  const { user } = useAuth();
  const supabase = createClient();

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!title || !url || !user) return;

    setLoading(true);

    const { data, error } = await supabase
      .from("bookmarks")
      .insert({
        title,
        url,
        user_id: user.id,
      })
      .select()
      .single();

    if (!error && data) {
      // 🔥 Optimistic update
      setBookmarks((prev: any) => [data, ...prev]);
    }

    setTitle("");
    setUrl("");
    setLoading(false);
  };

  return (
    <div className="flex gap-4">
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <Button onClick={handleAdd} disabled={loading}>
        {loading ? "Adding..." : "Add"}
      </Button>
    </div>
  );
}
