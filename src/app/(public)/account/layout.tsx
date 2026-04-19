"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ProductCard from "@/components/ui/ProductCard";
import { Separator } from "@/components/ui/separator";
import { orders } from "@/lib/mock-data";
import { cn, formatDate, formatPrice } from "@/lib/utils";
import { useWishlistStore } from "@/store/wishlist";
import {
  Edit3,
  Heart,
  LogOut,
  Settings,
  ShoppingBag,
  User
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

const navItems = [
  { id: "profile", label: "My Profile", icon: User },
  { id: "orders", label: "My Orders", icon: ShoppingBag },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "settings", label: "Settings", icon: Settings },
];

export const statusColors: Record<string, string> = {
  delivered: "bg-green-50 text-green-700",
  shipped: "bg-blue-50 text-blue-700",
  processing: "bg-yellow-50 text-yellow-700",
  pending: "bg-orange-50 text-orange-700",
  cancelled: "bg-red-50 text-red-700",
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState("profile");
  const wishlistItems = useWishlistStore((s) => s.items);
  const removeFromWishlist = useWishlistStore((s) => s.removeItem);

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="bg-white border-b border-[#D1D5DB] py-6">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900">
            My <span className="text-[#6366F1]">Account</span>
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden md:block w-64 shrink-0">
            <div className="bg-white rounded-2xl border border-[#D1D5DB] overflow-hidden">
              {/* Profile summary */}
              <div className="p-5 bg-gradient-to-br from-[#6366F1] to-[#4F46E5] text-white">
                <Avatar className="w-14 h-14 mb-3">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <p className="font-bold">John Doe</p>
                <p className="text-white/70 text-xs">john@example.com</p>
                <div className="flex items-center gap-3 mt-3">
                  <div className="text-center">
                    <p className="font-bold text-sm">{orders.length}</p>
                    <p className="text-white/60 text-[10px]">Orders</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-sm">{wishlistItems.length}</p>
                    <p className="text-white/60 text-[10px]">Wishlist</p>
                  </div>
                </div>
              </div>
              <nav className="p-2">
                {navItems.map((item) => (
                  <Link
                    key={item.id}
                    href={`/account/${item.id === "profile" ? "" : item.id}`}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left",
                      activeTab === item.id
                        ? "bg-[#EEF2FF] text-[#6366F1]"
                        : "text-gray-600 hover:bg-gray-50"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                ))}
                <Separator className="my-2" />
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Mobile tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-1 md:hidden">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={`/account/${item.id}`}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors",
                    activeTab === item.id
                      ? "bg-[#6366F1] text-white"
                      : "bg-white border border-[#D1D5DB] text-gray-600"
                  )}
                >
                  <item.icon className="w-3.5 h-3.5" />
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Profile */}
            {/* {activeTab === "profile" && (              
            )} */}

            {/* Orders */}
            {children}

            {/* Wishlist */}
            {/* {activeTab === "wishlist" && (
              
            )} */}

            {/* Settings */}
            {/* {activeTab === "settings" && (
              
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
