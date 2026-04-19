"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Grid3X3,
  Users,
  Settings,
  BarChart3,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  Menu,
} from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { orders } from "@/lib/mock-data";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Orders", href: "/dashboard/orders", icon: ShoppingCart, badge: orders.filter(o => o.status === "pending").length },
  { label: "Products", href: "/dashboard/products", icon: Package },
  { label: "Categories", href: "/dashboard/categories", icon: Grid3X3 },
  { label: "Customers", href: "/dashboard/customers", icon: Users },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

function SidebarContent({
  collapsed,
  pathname,
}: {
  collapsed: boolean;
  pathname: string;
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={cn("p-5 border-b border-white/10 flex items-center", collapsed ? "justify-center" : "gap-3")}>
        <div className="w-9 h-9 rounded-xl bg-[#635ad9] flex items-center justify-center shrink-0">
          <span className="text-white font-bold text-lg">N</span>
        </div>
        {!collapsed && (
          <div>
            <span className="text-white font-bold text-base">supershop</span>
            <p className="text-white/50 text-[10px]">Admin Panel</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto" data-lenis-prevent>
        {navItems.map((item) => {
          const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                collapsed ? "justify-center" : "",
                active
                  ? "bg-[#635ad9] text-white shadow-lg shadow-[#635ad9]/30"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              )}
            >
              <item.icon className="w-4.5 h-4.5 shrink-0 w-[18px] h-[18px]" />
              {!collapsed && (
                <>
                  <span>{item.label}</span>
                  {item.badge ? (
                    <Badge className="ml-auto bg-[#fbb400] text-black border-0 text-[10px] h-4 min-w-4 flex items-center justify-center px-1">
                      {item.badge}
                    </Badge>
                  ) : null}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom user */}
      <div className={cn("p-3 border-t border-white/10", collapsed ? "" : "")}>
        <div className={cn("flex items-center gap-3 p-2 rounded-xl hover:bg-white/10 cursor-pointer", collapsed ? "justify-center" : "")}>
          <Avatar className="w-8 h-8 shrink-0">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-medium truncate">Admin User</p>
              <p className="text-white/50 text-[10px] truncate">admin@supershop.com</p>
            </div>
          )}
          {!collapsed && (
            <Link href="/" className="text-white/40 hover:text-white/70 transition-colors">
              <LogOut className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
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
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-[#f8f8fd] overflow-hidden">
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col bg-[#404040] relative transition-all duration-300",
          collapsed ? "w-16" : "w-60"
        )}
      >
        <SidebarContent collapsed={collapsed} pathname={pathname} />
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-[#635ad9] text-white flex items-center justify-center shadow-md z-10"
        >
          {collapsed ? (
            <ChevronRight className="w-3 h-3" />
          ) : (
            <ChevronLeft className="w-3 h-3" />
          )}
        </button>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white border-b border-[#e8e8f0] px-6 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger className="md:hidden p-2 mt-1 -ml-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                <Menu className="w-5 h-5" />
              </SheetTrigger>
              <SheetContent side="left" className="p-0 bg-[#404040] w-60">
                <SheetHeader className="sr-only">
                  <SheetTitle>Navigation Menu</SheetTitle>
                </SheetHeader>
                <SidebarContent collapsed={false} pathname={pathname} />
              </SheetContent>
            </Sheet>

            <div>
              <h1 className="text-base font-bold text-gray-900">
                {navItems.find(
                  (n) =>
                    pathname === n.href ||
                    (n.href !== "/dashboard" && pathname.startsWith(n.href))
                )?.label || "Dashboard"}
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">
                Welcome back, Admin
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <Input
                placeholder="Search..."
                className="pl-8 h-8 w-48 text-sm border-[#e8e8f0]"
              />
            </div>

            <button className="relative p-2 text-gray-600 hover:text-[#635ad9] transition-colors">
              <Bell className="w-4.5 h-4.5 w-[18px] h-[18px]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#635ad9] rounded-full" />
            </button>

            <Link href="/" className="hidden sm:block">
              <Button variant="outline" size="sm" className="h-8 text-xs border-[#e8e8f0] gap-1.5">
                View Store
              </Button>
            </Link>

            <Avatar className="w-8 h-8">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6" data-lenis-prevent>{children}</main>
      </div>
    </div>
  );
}
