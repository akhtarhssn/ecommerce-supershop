"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Grid3X3,
  Phone,
  Handshake,
  Wrench,
  FileText,
  Star,
  LogOut,
  Bell,
  Search,
  Menu,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Order list", href: "/dashboard/orders", icon: ShoppingCart },
  { label: "Product", href: "/dashboard/products", icon: Package },
  { label: "categories", href: "/dashboard/categories", icon: Grid3X3 },
  { label: "Contact Info", href: "/dashboard/contact-info", icon: Phone },
  { label: "Our partners", href: "/dashboard/partners", icon: Handshake },
  { label: "Services", href: "/dashboard/services", icon: Wrench },
  { label: "Blog", href: "/dashboard/blog", icon: FileText },
  { label: "Brand", href: "/dashboard/brand", icon: Star },
];

function SidebarContent({ pathname }: { pathname: string }) {
  return (
    <div className="flex flex-col h-full bg-[#000000]">
      {/* Top user Avatar Area */}
      <div className="p-8 flex flex-col items-center justify-center border-b border-white/5">
        <Avatar className="w-20 h-20 mb-4 border-2 border-white/10">
          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=bill" />
          <AvatarFallback>BS</AvatarFallback>
        </Avatar>
        <span className="text-white font-semibold text-lg tracking-wide mb-0.5">Super Admin</span>
        <p className="text-white/60 text-xs">bill.sanders@example.com</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto" data-lenis-prevent>
        {navItems.map((item) => {
          const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium transition-all group",
                active
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn("w-5 h-5 shrink-0", active ? "text-white" : "text-white/40 group-hover:text-white/80")} />
              <span className="capitalize">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Log Out */}
      <div className="p-6">
        <button className="flex items-center gap-4 px-4 py-3 w-full text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg text-sm font-medium transition-colors">
          <LogOut className="w-5 h-5 shrink-0" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-[#F3F4F6] overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-72 shrink-0 h-full relative">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white px-8 py-4 flex items-center justify-between shrink-0 shadow-sm z-10">
          <div className="flex items-center gap-4">
            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger className="md:hidden p-2 mt-1 -ml-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                <Menu className="w-6 h-6" />
              </SheetTrigger>
              <SheetContent side="left" className="p-0 bg-[#000000] w-72 border-r-0">
                <SheetHeader className="sr-only">
                  <SheetTitle>Navigation Menu</SheetTitle>
                </SheetHeader>
                <SidebarContent pathname={pathname} />
              </SheetContent>
            </Sheet>

            <div>
              <h1 className="text-xl font-bold text-gray-900 capitalize">
                {navItems.find(
                  (n) =>
                    pathname === n.href ||
                    (n.href !== "/dashboard" && pathname.startsWith(n.href))
                )?.label || "Dashboard"}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search..."
                className="pl-9 h-10 w-64 text-sm bg-gray-50 border-transparent focus-visible:ring-0 focus-visible:bg-white focus-visible:border-[#6366F1]"
              />
            </div>

            <button className="relative p-2 text-gray-600 hover:text-[#6366F1] transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            
            <Link href="/" className="hidden sm:block">
              <Button variant="outline" size="sm" className="font-semibold px-4 border-[#E5E7EB]">
                View Store
              </Button>
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8" data-lenis-prevent>
          {children}
        </main>
      </div>
    </div>
  );
}
