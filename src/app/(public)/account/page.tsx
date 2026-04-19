"use client";

import Link from "next/link";
import {
  User,
  ShoppingBag,
  Heart,
  Settings,
  LogOut,
  Edit3,
  Package,
  MapPin,
  Star,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { formatPrice, formatDate } from "@/lib/utils";
import { orders } from "@/lib/mock-data";
import ProductCard from "@/components/ui/ProductCard";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const navItems = [
  { id: "profile", label: "My Profile", icon: User },
  { id: "orders", label: "My Orders", icon: ShoppingBag },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "settings", label: "Settings", icon: Settings },
];

const statusColors: Record<string, string> = {
  delivered: "bg-green-50 text-green-700",
  shipped: "bg-blue-50 text-blue-700",
  processing: "bg-yellow-50 text-yellow-700",
  pending: "bg-orange-50 text-orange-700",
  cancelled: "bg-red-50 text-red-700",
};

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const wishlistItems = useWishlistStore((s) => s.items);
  const removeFromWishlist = useWishlistStore((s) => s.removeItem);

  return (
    <div className="min-h-screen bg-[#f8f8fd]">
      <div className="bg-white border-b border-[#e8e8f0] py-6">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900">
            My <span className="text-[#635ad9]">Account</span>
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden md:block w-64 shrink-0">
            <div className="bg-white rounded-2xl border border-[#e8e8f0] overflow-hidden">
              {/* Profile summary */}
              <div className="p-5 bg-gradient-to-br from-[#635ad9] to-[#4f46e5] text-white">
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
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left",
                      activeTab === item.id
                        ? "bg-[#f5f3ff] text-[#635ad9]"
                        : "text-gray-600 hover:bg-gray-50"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </button>
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
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors",
                    activeTab === item.id
                      ? "bg-[#635ad9] text-white"
                      : "bg-white border border-[#e8e8f0] text-gray-600"
                  )}
                >
                  <item.icon className="w-3.5 h-3.5" />
                  {item.label}
                </button>
              ))}
            </div>

            {/* Profile */}
            {activeTab === "profile" && (
              <div className="bg-white rounded-2xl border border-[#e8e8f0] p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-bold text-gray-900 text-lg">Profile Information</h2>
                  <Button variant="outline" size="sm" className="border-[#635ad9] text-[#635ad9] gap-1.5">
                    <Edit3 className="w-3.5 h-3.5" />
                    Edit
                  </Button>
                </div>
                <div className="flex items-center gap-5 mb-7">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">John Doe</h3>
                    <p className="text-gray-500 text-sm">Customer since January 2024</p>
                    <Badge className="bg-[#f5f3ff] text-[#635ad9] border-0 mt-1 text-xs">
                      Regular Customer
                    </Badge>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  {[
                    { label: "First Name", value: "John", id: "fname" },
                    { label: "Last Name", value: "Doe", id: "lname" },
                    { label: "Email", value: "john@example.com", id: "email" },
                    { label: "Phone", value: "+1 234 567 8900", id: "phone" },
                  ].map((field) => (
                    <div key={field.id} className="space-y-1.5">
                      <Label className="text-sm font-medium text-gray-700">{field.label}</Label>
                      <Input defaultValue={field.value} className="border-[#e8e8f0]" readOnly />
                    </div>
                  ))}
                </div>
                <div className="mt-5 space-y-1.5">
                  <Label className="text-sm font-medium text-gray-700">Default Address</Label>
                  <Input defaultValue="123 Oak St, New York, NY 10001" className="border-[#e8e8f0]" readOnly />
                </div>
              </div>
            )}

            {/* Orders */}
            {activeTab === "orders" && (
              <div className="space-y-4">
                <h2 className="font-bold text-gray-900 text-lg">
                  Order History ({orders.length})
                </h2>
                {orders.map((order) => (
                  <div key={order.id} className="bg-white rounded-2xl border border-[#e8e8f0] p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="font-bold text-gray-900 font-mono">
                          {order.orderNumber}
                        </p>
                        <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={cn("border-0 text-xs capitalize", statusColors[order.status])}>
                          {order.status}
                        </Badge>
                        <p className="font-bold text-gray-900 mt-1">
                          {formatPrice(order.total)}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-1 mb-3">
                      {order.items.map((item) => (
                        <div key={item.productId} className="shrink-0">
                          <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#f8f8fd]">
                            <img src={item.productImage} alt={item.productName} className="w-full h-full object-cover" />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">
                        {order.items.length} item{order.items.length > 1 ? "s" : ""} · {order.paymentMethod}
                      </p>
                      <Button asChild variant="outline" size="sm" className="border-[#635ad9] text-[#635ad9] h-8 text-xs">
                        <Link href={`/account/orders/${order.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Wishlist */}
            {activeTab === "wishlist" && (
              <div>
                <h2 className="font-bold text-gray-900 text-lg mb-5">
                  My Wishlist ({wishlistItems.length})
                </h2>
                {wishlistItems.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-[#e8e8f0] p-12 text-center">
                    <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
                    <p className="text-gray-500 text-sm mb-4">Save products you love to find them easily later.</p>
                    <Button asChild className="bg-[#635ad9] hover:bg-[#4f46e5]">
                      <Link href="/shop">Browse Products</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {wishlistItems.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Settings */}
            {activeTab === "settings" && (
              <div className="bg-white rounded-2xl border border-[#e8e8f0] p-6 space-y-6">
                <h2 className="font-bold text-gray-900 text-lg">Account Settings</h2>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm">Change Password</h3>
                  <div className="space-y-3 max-w-sm">
                    <Input type="password" placeholder="Current password" className="border-[#e8e8f0]" />
                    <Input type="password" placeholder="New password" className="border-[#e8e8f0]" />
                    <Input type="password" placeholder="Confirm new password" className="border-[#e8e8f0]" />
                    <Button className="bg-[#635ad9] hover:bg-[#4f46e5] w-full" onClick={() => toast.success("Password updated!")}>
                      Update Password
                    </Button>
                  </div>
                </div>

                <Separator className="bg-[#e8e8f0]" />

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm">Notifications</h3>
                  <div className="space-y-3">
                    {[
                      "Order status updates",
                      "Newsletter and promotions",
                      "New product alerts",
                      "Price drop alerts",
                    ].map((notif) => (
                      <div key={notif} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{notif}</span>
                        <div className="w-10 h-5 bg-[#635ad9] rounded-full relative cursor-pointer">
                          <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="bg-[#e8e8f0]" />

                <div>
                  <h3 className="font-semibold text-red-500 mb-3 text-sm">Danger Zone</h3>
                  <Button variant="destructive" size="sm" onClick={() => toast.error("Account deletion requires confirmation via email.")}>
                    Delete Account
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
