"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  Package,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { products } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState(products);

  const filtered = items.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
    toast.success("Product deleted.");
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Products</h1>
          <p className="text-sm text-gray-500">{items.length} products total</p>
        </div>
        <Button asChild className="bg-[#6366F1] hover:bg-[#4F46E5] gap-2">
          <Link href="/dashboard/products/add">
            <Plus className="w-4 h-4" />
            Add Product
          </Link>
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 h-9 text-sm border-[#D1D5DB]"
          />
        </div>
        <Button variant="outline" size="sm" className="gap-2 border-[#D1D5DB]">
          <Filter className="w-3.5 h-3.5" />
          Filter
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#D1D5DB] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#D1D5DB] bg-[#F9FAFB]">
                {["Product", "Category", "Price", "Stock", "Status", "Rating", ""].map((h) => (
                  <th key={h} className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-[#F9FAFB] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#F9FAFB] shrink-0">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-xs line-clamp-1 max-w-[160px]">
                          {product.name}
                        </p>
                        <p className="text-[10px] text-gray-400">{product.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant="secondary" className="text-[10px] bg-[#EEF2FF] text-[#6366F1] border-0">
                      {product.category}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4">
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{formatPrice(product.price)}</p>
                      {product.originalPrice > product.price && (
                        <p className="text-[10px] text-gray-400 line-through">{formatPrice(product.originalPrice)}</p>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={cn(
                        "text-xs font-medium",
                        product.stock <= 5 ? "text-red-500" : product.stock <= 20 ? "text-orange-500" : "text-[#4baf4f]"
                      )}
                    >
                      {product.stock} units
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col gap-1">
                      {product.isFeatured && (
                        <Badge className="text-[9px] bg-[#6366F1] text-white border-0 px-1.5 py-0 w-fit">Featured</Badge>
                      )}
                      {product.isBestSeller && (
                        <Badge className="text-[9px] bg-[#fbb400] text-black border-0 px-1.5 py-0 w-fit">Best Seller</Badge>
                      )}
                      {product.isOrganic && (
                        <Badge className="text-[9px] bg-[#4baf4f] text-white border-0 px-1.5 py-0 w-fit">Organic</Badge>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1">
                      <span className="text-[#fbb400] text-xs">★</span>
                      <span className="text-xs font-medium">{product.rating}</span>
                      <span className="text-[10px] text-gray-400">({product.reviewCount})</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="h-7 w-7 flex items-center justify-center rounded-md hover:bg-accent transition-colors">
                        <MoreHorizontal className="w-3.5 h-3.5" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Link href={`/shop/${product.slug}`} target="_blank" className="w-full">
                          <DropdownMenuItem>
                            View on Site
                          </DropdownMenuItem>
                        </Link>
                        <Link href={`/dashboard/products/${product.id}/edit`} className="w-full">
                          <DropdownMenuItem>
                            <Edit className="w-3.5 h-3.5 mr-2" />
                            Edit Product
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem
                          className="text-red-500 focus:text-red-500"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash2 className="w-3.5 h-3.5 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <Package className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p>No products found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
