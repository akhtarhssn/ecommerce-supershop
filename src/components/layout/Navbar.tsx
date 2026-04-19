"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { cn } from "@/lib/utils";
import { CartSheet } from "@/components/cart/CartSheet";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const categories = [
  "Fresh Vegetables",
  "Fresh Fruits",
  "Dairy & Eggs",
  "Meat & Fish",
  "Bakery",
  "Beverages",
  "Snacks",
  "Organic",
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartCount = useCartStore((s) => s.getItemCount());
  const wishlistCount = useWishlistStore((s) => s.items.length);

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      {/* <div className="bg-[#635ad9] text-white py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3 h-3" />
              +1 800 123 4567
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3 h-3" />
              hello@supershop.com
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3" />
              New York, USA
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span>Free shipping on orders over $50!</span>
            <div className="flex items-center gap-3">
              <Link href="/auth/login" className="hover:underline">Sign In</Link>
              <span>|</span>
              <Link href="/auth/signup" className="hover:underline">Register</Link>
            </div>
          </div>
        </div>
      </div> */}

      {/* Main nav */}
      <div
        className={cn(
          "bg-white transition-shadow duration-300",
          isScrolled ? "shadow-md" : "shadow-sm"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-9 h-9 rounded-xl bg-[#635ad9] flex items-center justify-center">
                <span className="text-white font-bold text-lg">SS</span>
              </div>
              <span className="text-xl font-bold text-gray-900">
                Super<span className="text-[#635ad9]">shop</span>
              </span>
            </Link>

            {/* Search bar */}
            <div className="flex-1 flex items-center max-w-2xl">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center rounded-md border border-r-0 border-[#e8e8f0] bg-white text-sm text-gray-600 h-11 px-3 gap-1 shrink-0 hover:bg-gray-50 transition-colors">
                  All Categories
                  <ChevronDown className="w-3.5 h-3.5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  {categories.map((cat) => (
                    <Link key={cat} href={`/shop?category=${cat.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`} className="w-full">
                      <DropdownMenuItem>
                        {cat}
                      </DropdownMenuItem>
                    </Link>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Input
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-none border-x-0 h-11 focus-visible:ring-0 focus-visible:border-[#635ad9] border-[#e8e8f0]"
              />
              <Button
                className="rounded-l-none h-11 bg-[#635ad9] hover:bg-[#4f46e5] text-white px-5 shrink-0"
                onClick={() => {
                  if (searchQuery) window.location.href = `/shop?q=${searchQuery}`;
                }}
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>

            {/* Desktop nav links */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "nav-link text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "text-[#635ad9] active"
                      : "text-gray-700 hover:text-[#635ad9]"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Action icons */}
            <div className="flex items-center gap-3 ml-auto lg:ml-0 shrink-0">
              <Link href="/account/wishlist" className="relative p-2 text-gray-600 hover:text-[#635ad9] transition-colors">
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center bg-[#fbb400] text-black text-[10px] border-0">
                    {wishlistCount}
                  </Badge>
                )}
              </Link>
              <CartSheet>
                <div className="relative p-2 text-gray-600 hover:text-[#635ad9] transition-colors focus:outline-none">
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center bg-[#635ad9] text-white text-[10px] border-0">
                      {cartCount}
                    </Badge>
                  )}
                </div>
              </CartSheet>
              <DropdownMenu>
                <DropdownMenuTrigger className="p-2 text-gray-600 hover:text-[#635ad9] rounded-md hover:bg-accent transition-colors">
                  <User className="w-5 h-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <Link href="/account" className="w-full">
                    <DropdownMenuItem>My Account</DropdownMenuItem>
                  </Link>
                  <Link href="/account/orders" className="w-full">
                    <DropdownMenuItem>My Orders</DropdownMenuItem>
                  </Link>
                  <Link href="/account/wishlist" className="w-full">
                    <DropdownMenuItem>Wishlist</DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <Link href="/dashboard" className="w-full">
                    <DropdownMenuItem>Dashboard</DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <Link href="/auth/login" className="w-full">
                    <DropdownMenuItem>Sign In</DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile menu trigger */}
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                  <Menu className="w-5 h-5" />
                </SheetTrigger>
                <SheetContent side="left" className="w-72 p-0">
                  <SheetHeader className="p-6 border-b bg-[#635ad9] text-white">
                    <SheetTitle className="text-white flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                        <span className="text-white font-bold">N</span>
                      </div>
                      supershop
                    </SheetTitle>
                  </SheetHeader>
                  <nav className="p-4 flex flex-col gap-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                          pathname === link.href
                            ? "bg-[#f5f3ff] text-[#635ad9]"
                            : "text-gray-700 hover:bg-gray-50"
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                    <div className="my-2 border-t" />
                    <Link
                      href="/auth/login"
                      onClick={() => setMobileOpen(false)}
                      className="px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/signup"
                      onClick={() => setMobileOpen(false)}
                      className="px-4 py-3 rounded-lg text-sm font-medium bg-[#635ad9] text-white text-center"
                    >
                      Register
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        {/* Category Nav strip */}
        <div className="border-t border-[#e8e8f0] hidden md:block">
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-6 overflow-x-auto scrollbar-none">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/shop?category=${cat.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
                className="text-xs font-medium text-gray-600 hover:text-[#635ad9] whitespace-nowrap transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}