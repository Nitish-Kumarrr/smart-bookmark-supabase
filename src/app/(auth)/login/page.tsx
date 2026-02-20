"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        router.replace("/dashboard");
      }
    };

    checkUser();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-100 via-purple-100 to-pink-100 px-4">

      <div className="absolute w-72 h-72 bg-indigo-300 rounded-full blur-3xl opacity-30 top-20 left-10"></div>
      <div className="absolute w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-30 bottom-20 right-10"></div>

      <div className="relative w-full max-w-md">
        <LoginForm />
      </div>

    </div>
  );
}
