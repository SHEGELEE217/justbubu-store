// app/admin/layout.tsx
"use client";
import { LayoutDashboard, Package, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-justbubu-purple text-white flex-col hidden md:flex">
        <div className="h-20 flex items-center justify-center border-b border-white/10">
          <h1 className="text-2xl font-serif font-bold tracking-wider">
            JB <span className="text-justbubu-gold">Admin</span>
          </h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link 
            href="/admin" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${pathname === '/admin' ? 'bg-white/10 text-justbubu-gold font-semibold' : 'hover:bg-white/5 text-gray-300'}`}
          >
            <LayoutDashboard size={20} /> Add Product
          </Link>
          <Link 
            href="/admin/products" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${pathname === '/admin/products' ? 'bg-white/10 text-justbubu-gold font-semibold' : 'hover:bg-white/5 text-gray-300'}`}
          >
            <Package size={20} /> All Products
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-lg transition-colors text-gray-300">
            <Settings size={20} /> Settings
          </Link>
        </nav>
      
        <div className="p-4 border-t border-white/10 mt-auto">
          <button 
            onClick={async () => {
              await fetch('/api/auth/logout', { method: 'POST' });
              window.location.href = '/login';
            }}
            className="flex items-center gap-3 px-4 py-3 w-full hover:bg-red-500/20 text-red-300 rounded-lg transition-colors font-semibold"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto h-screen">
        {children}
      </main>
    </div>
  );
}