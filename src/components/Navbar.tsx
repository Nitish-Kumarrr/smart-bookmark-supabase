"use client"
import LoginLogoutButton from "./LoginLogoutButton";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";

export default  function Navbar() {
  const {user} = useAuth();
  const pathname = usePathname();

  return (
    <nav className="flex justify-between p-4 border-b">
      <Link href="/" className="font-bold text-2xl">
        Smart Bookmark
      </Link>

      <div className="flex gap-4 items-center">
        {user && <Link href="/dashboard" >Dashboard</Link>}
        <LoginLogoutButton />
      </div>
    </nav>
  );
}
