"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useAuth } from "@/context/AuthContext";

const LoginLogoutButton = () => {
  const { user, setUser } = useAuth();
  const router = useRouter();
  const supabase = createClient();
  

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/login");
  };

  if (user) {
    return (
      <Button onClick={handleLogout}>
        Log out
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      onClick={() => router.push("/login")}
    >
      Login
    </Button>
  );
};

export default LoginLogoutButton;
