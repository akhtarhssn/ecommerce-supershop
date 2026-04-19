"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { type Product } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
  view?: "grid" | "list";
}

export default function ProductCard({
  product,
  className,
  view = "grid",
}: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    toast.success(`${product.name} added to cart!`, {
      description: "Check your cart to complete purchase.",
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleItem(product);
    toast.success(
      inWishlist ? "Removed from wishlist" : "Added to wishlist!"
    );
  };

  if (view === "list") {
    return (
      <Link href={`/shop/${product.slug}`} className={cn("block", className)}>
        <div className="flex gap-4 bg-white rounded-2xl border border-[#e8e8f0] p-4 hover:shadow-lg transition-all duration-300 group">
          <div className="relative w-28 h-28 shrink-0 rounded-xl overflow-hidden bg-[#f8f8fd]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {product.discount > 0 && (
              <span className="absolute top-1.5 left-1.5 badge-discount text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                -{product.discount}%
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xs text-[#635ad9] font-medium mb-0.5">{product.category}</p>
                <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">{product.name}</h3>
              </div>
              <button
                onClick={handleWishlist}
                className={cn(
                  "p-1.5 rounded-full shrink-0 transition-colors",
                  inWishlist ? "text-red-500" : "text-gray-400 hover:text-red-500"
                )}
              >
                <Heart className={cn("w-4 h-4", inWishlist && "fill-current")} />
              </button>
            </div>
            <div className="flex items-center gap-1 my-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-3 h-3",
                    i < Math.floor(product.rating)
                      ? "text-[#fbb400] fill-current"
                      : "text-gray-200 fill-current"
                  )}
                />
              ))}
              <span className="text-xs text-gray-500 ml-0.5">({product.reviewCount})</span>
            </div>
            <p className="text-xs text-gray-500 line-clamp-2 mb-2">{product.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-900">{formatPrice(product.price)}</span>
                {product.originalPrice > product.price && (
                  <span className="text-gray-400 line-through text-sm">{formatPrice(product.originalPrice)}</span>
                )}
              </div>
              <Button
                size="sm"
                onClick={handleAddToCart}
                className="bg-[#635ad9] hover:bg-[#4f46e5] text-white h-8 text-xs"
              >
                <ShoppingCart className="w-3 h-3 mr-1" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/shop/${product.slug}`} className={cn("block", className)}>
      <div className="product-card bg-white rounded-2xl border border-[#e8e8f0] overflow-hidden group">
        {/* Image */}
        <div className="relative aspect-square bg-[#f8f8fd] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.discount > 0 && (
              <span className="badge-discount text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                -{product.discount}%
              </span>
            )}
            {product.isNew && (
              <span className="bg-[#fbb400] text-black text-[10px] font-bold px-2 py-0.5 rounded-full">
                NEW
              </span>
            )}
            {product.isOrganic && (
              <span className="bg-[#4baf4f] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                ORGANIC
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={handleWishlist}
              className={cn(
                "w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center transition-colors",
                inWishlist ? "text-red-500" : "text-gray-500 hover:text-red-500"
              )}
            >
              <Heart
                className={cn("w-3.5 h-3.5", inWishlist && "fill-current")}
              />
            </button>
            <button className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-500 hover:text-[#635ad9] transition-colors">
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Stock warning */}
          {product.stock <= 5 && product.stock > 0 && (
            <div className="absolute bottom-0 left-0 right-0 bg-red-500/90 text-white text-[10px] text-center py-1 font-medium">
              Only {product.stock} left!
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-xs text-[#635ad9] font-medium mb-1">{product.category}</p>
          <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-2 leading-snug">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-3 h-3",
                  i < Math.floor(product.rating)
                    ? "text-[#fbb400] fill-current"
                    : "text-gray-200 fill-current"
                )}
              />
            ))}
            <span className="text-xs text-gray-500 ml-0.5">
              ({product.reviewCount})
            </span>
          </div>

          {/* Price + Cart */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-gray-900">
                {formatPrice(product.price)}
              </div>
              {product.originalPrice > product.price && (
                <div className="text-gray-400 line-through text-xs">
                  {formatPrice(product.originalPrice)}
                </div>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              className="w-9 h-9 rounded-full bg-[#635ad9] hover:bg-[#4f46e5] flex items-center justify-center text-white transition-colors shadow-md shadow-[#635ad9]/25"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
