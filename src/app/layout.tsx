import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Smart Bookmark Manager",
  description:
    "Secure and real-time private bookmark manager built with Next.js and Supabase.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background antialiased">
        <AuthProvider>
        <div className="fixed top-0 left-0 w-full z-50 bg-background border-b">
          <Navbar />
        </div>

          {children}
          
        </AuthProvider>

      </body>
    </html>
  );
}
