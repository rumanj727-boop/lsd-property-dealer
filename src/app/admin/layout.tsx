import Link from 'next/link';
import { LayoutDashboard, Building2, Map, Users, Settings, LogOut, Menu } from 'lucide-react';
import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar - desktop */}
      <aside className="hidden w-64 flex-col bg-primary text-primary-foreground md:flex">
        <div className="flex h-16 items-center justify-center border-b border-primary-foreground/10 px-4">
          <span className="text-lg font-bold">LSD Admin</span>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          <Link href="/admin" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-primary-foreground/10">
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link href="/admin/properties" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-primary-foreground/10">
            <Building2 className="h-5 w-5" />
            Properties
          </Link>
          <Link href="/admin/plots" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-primary-foreground/10">
            <Map className="h-5 w-5" />
            Plots
          </Link>
          <Link href="/admin/leads" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-primary-foreground/10">
            <Users className="h-5 w-5" />
            Leads
          </Link>
        </nav>
        <div className="border-t border-primary-foreground/10 p-4">
          <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-primary-foreground/10">
            <Settings className="h-5 w-5" />
            Settings
          </button>
          <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-red-400 hover:bg-primary-foreground/10 hover:text-red-300">
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Mobile header */}
        <header className="flex h-16 items-center border-b bg-background px-4 md:hidden">
          <button className="mr-4 text-muted-foreground">
            <Menu className="h-6 w-6" />
          </button>
          <span className="text-lg font-bold">LSD Admin</span>
        </header>
        
        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
