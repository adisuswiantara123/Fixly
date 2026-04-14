"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { LayoutDashboardIcon, TicketIcon, UsersIcon, SettingsIcon, LogOutIcon, SearchIcon, BellIcon, MenuIcon, XIcon } from "lucide-react";
import { fetchApi } from "@/lib/api";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");
  const [ticketCount, setTicketCount] = useState(0);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    if (token) {
      fetchApi("/tickets")
        .then((data) => setTicketCount(Array.isArray(data) ? data.length : 0))
        .catch(() => setTicketCount(0));
    }
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (globalSearch.trim()) {
      router.push(`/dashboard/search?q=${encodeURIComponent(globalSearch.trim())}`);
    }
  };

  // Helper function to check if link is active
  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(path);
  };

  // Helper function for styling based on active state
  const getLinkClasses = (path: string) => {
    const active = isActive(path);
    return `flex items-center gap-3 px-3 py-2.5 rounded-lg group transition-all shrink-0 ${
      active 
        ? "bg-brand-500/10 text-brand-400" 
        : "text-zinc-400 hover:bg-white/5 hover:text-white"
    }`;
  };

  const getIconClasses = (path: string) => {
    const active = isActive(path);
    return `transition-transform ${
      active 
        ? "text-brand-400" 
        : "text-zinc-400 group-hover:text-zinc-300 group-hover:scale-110"
    }`;
  };

  // Sidebar Component for modularity
  const SidebarContent = () => (
    <>
      <div className="h-16 flex items-center px-6 border-b border-dark-border gap-3 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-white font-bold">
          F
        </div>
        <span className="text-xl font-bold text-white tracking-tight">Fixly</span>
        {/* Mobile Close Button */}
        <button 
          className="md:hidden ml-auto text-zinc-400 hover:text-white p-1"
          onClick={() => setMobileMenuOpen(false)}
        >
          <XIcon size={20} />
        </button>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        <p className="px-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Main Menu</p>
        
        <Link href="/dashboard" className={getLinkClasses("/dashboard")} onClick={() => setMobileMenuOpen(false)}>
          <LayoutDashboardIcon size={18} className={getIconClasses("/dashboard")} />
          <span className="font-medium">Dashboard</span>
        </Link>
        
        <Link href="/dashboard/tickets" className={getLinkClasses("/dashboard/tickets")} onClick={() => setMobileMenuOpen(false)}>
          <TicketIcon size={18} className={getIconClasses("/dashboard/tickets")} />
          <span className="font-medium">Tickets</span>
          {ticketCount > 0 && (
            <span className="ml-auto bg-brand-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{ticketCount}</span>
          )}
        </Link>
        
        <Link href="/dashboard/customers" className={getLinkClasses("/dashboard/customers")} onClick={() => setMobileMenuOpen(false)}>
          <UsersIcon size={18} className={getIconClasses("/dashboard/customers")} />
          <span className="font-medium">Customers</span>
        </Link>
        
        <div className="pt-6">
          <p className="px-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">System</p>
          <Link href="/dashboard/settings" className={getLinkClasses("/dashboard/settings")} onClick={() => setMobileMenuOpen(false)}>
            <SettingsIcon size={18} className={getIconClasses("/dashboard/settings")} />
            <span className="font-medium">Settings</span>
          </Link>
        </div>
      </nav>

      {/* User Card */}
      <div className="p-4 border-t border-dark-border bg-black/20 shrink-0">
        <div className="flex items-center gap-3 mb-4 cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-600 to-cyan-400 border-2 border-dark-border shrink-0"></div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Super Admin</p>
            <p className="text-xs text-zinc-500 truncate">admin@fixly.io</p>
          </div>
        </div>
        <Link href="/" className="flex items-center justify-center gap-2 w-full py-2 text-sm text-zinc-400 hover:text-red-400 bg-white/5 hover:bg-red-500/10 rounded-lg transition-colors">
          <LogOutIcon size={16} />
          Sign Out
        </Link>
      </div>
    </>
  );

  return (
    <div className="flex h-screen w-full bg-dark-bg text-foreground overflow-hidden selection:bg-brand-500 selection:text-white">
      
      {/* Desktop Sidebar */}
      <aside className="w-64 border-r border-dark-border bg-dark-surface/50 backdrop-blur-xl hidden md:flex flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/80 z-40 md:hidden flex" onClick={() => setMobileMenuOpen(false)}>
          <aside className="w-72 bg-dark-surface h-full flex flex-col border-r border-dark-border shadow-2xl" onClick={e => e.stopPropagation()}>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full min-w-0 bg-[#0c0c0e]">
        {/* Header */}
        <header className="h-16 shrink-0 border-b border-dark-border bg-dark-bg/80 backdrop-blur-xl flex items-center justify-between px-4 sm:px-8 z-10 sticky top-0">
          
          <div className="flex items-center flex-1 gap-4">
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 -ml-2 text-zinc-400 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              <MenuIcon size={24} />
            </button>
            
            <form onSubmit={handleSearch} className="max-w-md w-full relative hidden sm:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon size={16} className="text-zinc-500" />
              </div>
              <input 
                type="text" 
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                placeholder="Search tickets, customers..." 
                className="block w-full pl-10 pr-3 py-2 border border-dark-border rounded-lg bg-dark-surface text-sm text-zinc-300 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500 transition-colors"
              />
            </form>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/dashboard/notifications" className="relative p-2 text-zinc-400 hover:text-white rounded-full hover:bg-white/5 transition-colors">
              <span className={`absolute top-1.5 right-1.5 w-2 h-2 rounded-full border-2 border-dark-bg animate-pulse ${pathname === '/dashboard/notifications' ? 'bg-zinc-500' : 'bg-red-500'}`}></span>
              <BellIcon size={20} className={pathname === '/dashboard/notifications' ? 'text-brand-400' : ''} />
            </Link>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-600 to-cyan-400 sm:hidden"></div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 sm:p-8">
          {children}
        </div>
      </main>

    </div>
  );
}
