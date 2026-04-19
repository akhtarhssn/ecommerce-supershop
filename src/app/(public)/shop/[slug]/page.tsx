"use client";

import { useState, use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  ShieldCheck,
  RotateCcw,
  Minus,
  Plus,
  ChevronRight,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import ProductCard from "@/components/ui/ProductCard";
import { products } from "@/lib/mock-data";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const product = products.find((p) => p.slug === slug);
  if (!product) return notFound();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState(product.weight);

  const addItem = useCartStore((s) => s.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const allImages = product.images.length > 0 ? product.images : [product.image];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    toast.success(`${quantity}x ${product.name} added to cart!`);
  };

  const weights = ["250g", "500g", "1 kg", "2 kg"];

  return (
    <div className="min-h-screen bg-[#f8f8fd]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#e8e8f0]">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#635ad9]">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/shop" className="hover:text-[#635ad9]">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          <Link
            href={`/shop?category=${product.categorySlug}`}
            className="hover:text-[#635ad9]"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-900 font-medium line-clamp-1">
            {product.name}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-10 mb-16">
          {/* Image gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-3xl overflow-hidden border border-[#e8e8f0] relative group">
              <img
                src={allImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {product.discount > 0 && (
                <span className="absolute top-4 left-4 badge-discount text-white text-sm font-bold px-3 py-1 rounded-full">
                  -{product.discount}% OFF
                </span>
              )}
            </div>
            {allImages.length > 1 && (
              <div className="flex gap-3">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={cn(
                      "w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0",
                      i === selectedImage
                        ? "border-[#635ad9] shadow-md"
                        : "border-[#e8e8f0] hover:border-[#635ad9]/50"
                    )}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="space-y-5">
            {/* Category + badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary" className="bg-[#f5f3ff] text-[#635ad9] border-0">
                {product.category}
              </Badge>
              {product.isOrganic && (
                <Badge className="bg-[#4baf4f] text-white border-0">Organic</Badge>
              )}
              {product.isNew && (
                <Badge className="bg-[#fbb400] text-black border-0">New</Badge>
              )}
              {product.isBestSeller && (
                <Badge className="bg-[#635ad9] text-white border-0">Best Seller</Badge>
              )}
            </div>

            <h1 className="text-3xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-5 h-5",
                      i < Math.floor(product.rating)
                        ? "text-[#fbb400] fill-current"
                        : "text-gray-200 fill-current"
                    )}
                  />
                ))}
              </div>
              <span className="font-semibold text-gray-900">
                {product.rating}
              </span>
              <span className="text-gray-500 text-sm">
                ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-end gap-4">
              <span className="text-4xl font-extrabold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-xl text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                    Save {formatPrice(product.originalPrice - product.price)}
                  </span>
                </>
              )}
            </div>

            <Separator className="bg-[#e8e8f0]" />

            {/* Weight selector */}
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-2">
                Select Weight
              </p>
              <div className="flex flex-wrap gap-2">
                {weights.map((w) => (
                  <button
                    key={w}
                    onClick={() => setSelectedWeight(w)}
                    className={cn(
                      "px-4 py-2 rounded-lg border text-sm font-medium transition-all",
                      selectedWeight === w
                        ? "border-[#635ad9] bg-[#f5f3ff] text-[#635ad9]"
                        : "border-[#e8e8f0] text-gray-600 hover:border-[#635ad9]"
                    )}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + Add to cart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 border border-[#e8e8f0] rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-11 flex items-center justify-center text-gray-600 hover:bg-[#f8f8fd] transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-semibold text-gray-900">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity((q) => Math.min(product.stock, q + 1))
                  }
                  className="w-10 h-11 flex items-center justify-center text-gray-600 hover:bg-[#f8f8fd] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-[#635ad9] hover:bg-[#4f46e5] text-white h-11 font-semibold gap-2 shadow-lg shadow-[#635ad9]/25"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </Button>

              <button
                onClick={() => {
                  toggleItem(product);
                  toast.success(inWishlist ? "Removed from wishlist" : "Added to wishlist!");
                }}
                className={cn(
                  "w-11 h-11 rounded-xl border border-[#e8e8f0] flex items-center justify-center transition-colors",
                  inWishlist
                    ? "text-red-500 border-red-200 bg-red-50"
                    : "text-gray-500 hover:text-red-500 hover:border-red-200"
                )}
              >
                <Heart className={cn("w-5 h-5", inWishlist && "fill-current")} />
              </button>
            </div>

            {/* Buy now */}
            <Button
              asChild
              variant="outline"
              className="w-full h-11 border-[#635ad9] text-[#635ad9] hover:bg-[#f5f3ff] font-semibold"
            >
              <Link href="/checkout">Buy Now</Link>
            </Button>

            {/* Stock status */}
            <div className="flex items-center gap-2 text-sm">
              <Package className="w-4 h-4 text-[#4baf4f]" />
              <span className="text-gray-600">
                {product.stock > 10 ? (
                  <span className="text-[#4baf4f] font-medium">In Stock</span>
                ) : product.stock > 0 ? (
                  <span className="text-orange-500 font-medium">
                    Only {product.stock} left!
                  </span>
                ) : (
                  <span className="text-red-500 font-medium">Out of Stock</span>
                )}
                {" "} · SKU: NK{product.id.padStart(4, "0")}
              </span>
            </div>

            <Separator className="bg-[#e8e8f0]" />

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Truck, label: "Free Delivery", sub: "Orders $50+" },
                { icon: RotateCcw, label: "Easy Returns", sub: "30-day policy" },
                { icon: ShieldCheck, label: "Secure", sub: "100% safe" },
              ].map(({ icon: Icon, label, sub }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[#f8f8fd] text-center"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#f5f3ff] flex items-center justify-center">
                    <Icon className="w-4 h-4 text-[#635ad9]" />
                  </div>
                  <p className="text-xs font-semibold text-gray-900">{label}</p>
                  <p className="text-[10px] text-gray-500">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs: Description, Reviews */}
        <div className="bg-white rounded-3xl border border-[#e8e8f0] p-6 mb-16">
          <Tabs defaultValue="description">
            <TabsList className="mb-6 bg-[#f8f8fd]">
              <TabsTrigger value="description" className="data-[state=active]:bg-[#635ad9] data-[state=active]:text-white">
                Description
              </TabsTrigger>
              <TabsTrigger value="reviews" className="data-[state=active]:bg-[#635ad9] data-[state=active]:text-white">
                Reviews ({product.reviewCount})
              </TabsTrigger>
              <TabsTrigger value="shipping" className="data-[state=active]:bg-[#635ad9] data-[state=active]:text-white">
                Shipping
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="text-gray-600 leading-relaxed">
              <p className="mb-4">{product.description}</p>
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="space-y-2">
                  {[
                    ["Category", product.category],
                    ["Brand", product.brand],
                    ["Weight", product.weight],
                    ["Unit", product.unit],
                  ].map(([k, v]) => (
                    <div key={k} className="flex gap-4 text-sm">
                      <span className="text-gray-500 w-24 shrink-0">{k}:</span>
                      <span className="font-medium text-gray-900">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  {[
                    ["Tags", product.tags.join(", ")],
                    ["Stock", `${product.stock} units`],
                    ["Organic", product.isOrganic ? "Yes" : "No"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex gap-4 text-sm">
                      <span className="text-gray-500 w-24 shrink-0">{k}:</span>
                      <span className="font-medium text-gray-900">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews">
              <div className="flex items-center gap-6 mb-6 p-5 bg-[#f8f8fd] rounded-2xl">
                <div className="text-center">
                  <p className="text-5xl font-extrabold text-gray-900">
                    {product.rating}
                  </p>
                  <div className="flex items-center justify-center gap-0.5 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-4 h-4",
                          i < Math.floor(product.rating)
                            ? "text-[#fbb400] fill-current"
                            : "text-gray-200 fill-current"
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {product.reviewCount} reviews
                  </p>
                </div>
                <div className="flex-1 space-y-2">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <div key={stars} className="flex items-center gap-2">
                      <span className="text-xs w-3 text-gray-500">{stars}</span>
                      <Star className="w-3 h-3 text-[#fbb400] fill-current" />
                      <div className="flex-1 h-2 bg-gray-100 rounded-full">
                        <div
                          className="h-2 bg-[#fbb400] rounded-full"
                          style={{
                            width: `${stars === 5 ? 70 : stars === 4 ? 20 : stars === 3 ? 7 : stars === 2 ? 2 : 1}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-gray-500 text-sm text-center">
                Detailed reviews would load from backend API.
              </p>
            </TabsContent>
            <TabsContent value="shipping" className="space-y-4 text-gray-600">
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    icon: Truck,
                    title: "Standard Delivery",
                    desc: "2-3 business days · Free on orders $50+",
                  },
                  {
                    icon: Truck,
                    title: "Express Delivery",
                    desc: "Same day delivery · $9.99 flat rate",
                  },
                  {
                    icon: RotateCcw,
                    title: "Returns Policy",
                    desc: "Easy 30-day returns for all fresh products",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Quality Guarantee",
                    desc: "100% freshness guaranteed at delivery",
                  },
                ].map(({ icon: Icon, title, desc }) => (
                  <div
                    key={title}
                    className="flex gap-3 p-4 rounded-xl border border-[#e8e8f0]"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#f5f3ff] flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-[#635ad9]" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        {title}
                      </p>
                      <p className="text-sm text-gray-500 mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Related <span className="text-[#635ad9]">Products</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
