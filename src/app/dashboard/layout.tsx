"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
const router = useRouter();
const pathname = usePathname();
const [userEmail, setUserEmail] = useState("");
const [loading, setLoading] = useState(true);

useEffect(() => {
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (!session) {
      router.push("/login");
    } else {
      setUserEmail(session.user.email ?? "");
      setLoading(false);
    }
  });
}, [router]);

const handleSignOut = async () => {
  await supabase.auth.signOut();
  router.push("/");
};

if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin w-8 h-8 border-4 border-[#1a3a6b] border-t-transparent rounded-full" />
    </div>
  );
}

const navItems = [
  { href: "/dashboard", label: "Overview", icon: "🏠" },
  { href: "/dashboard/documents", label: "Documents", icon: "📋" },
  { href: "/dashboard/status", label: "Application Status", icon: "📊" },
];

return (
  <div className="min-h-screen bg-gray-50 flex">
    {/* Sidebar */}
    <aside className="w-64 bg-[#1a3a6b] text-white flex flex-col fixed h-full">
      <div className="p-6 border-b border-blue-800">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🎓</span>
          <span className="font-bold text-lg">ChinaUni</span>
        </Link>
        <p className="text-blue-300 text-xs mt-1 truncate">{userEmail}</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              pathname === item.href
                ? "bg-white/20 text-white"
                : "text-blue-200 hover:bg-white/10 hover:text-white"
            }`}
          >
            <span>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-blue-800">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-blue-200 hover:bg-white/10 hover:text-white transition-all"
        >
          <span>🚪</span>
          Sign Out
        </button>
      </div>
    </aside>

    {/* Main content */}
    <main className="flex-1 ml-64 p-8">{children}</main>
  </div>
);
}