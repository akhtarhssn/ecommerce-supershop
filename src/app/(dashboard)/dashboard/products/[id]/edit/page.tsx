"use client";

import Link from "next/link";
import { ArrowLeft, Upload } from "lucide-react";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { products } from "@/lib/mock-data";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState, use } from "react";
import { formatPrice } from "@/lib/utils";

const categoryOptions = [
  "Fresh Vegetables", "Fresh Fruits", "Dairy & Eggs", "Meat & Fish", "Bakery", "Beverages", "Snacks", "Organic"
];

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id);
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  if (!product) return notFound();

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSaving(false);
    toast.success("Product updated successfully!");
    router.push("/dashboard/products");
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="sm" className="gap-2 text-gray-600">
          <Link href="/dashboard/products">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </Button>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Edit Product</h1>
          <p className="text-sm text-gray-500">#{product.id} · {product.name}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-2xl border border-[#e8e8f0] p-6">
            <h3 className="font-bold text-gray-900 mb-5">Basic Information</h3>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Product Name</Label>
                <Input defaultValue={product.name} className="border-[#e8e8f0]" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Description</Label>
                <textarea
                  defaultValue={product.description}
                  rows={4}
                  className="w-full rounded-lg border border-[#e8e8f0] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#635ad9]/20 focus:border-[#635ad9] resize-none"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Category</Label>
                  <Select defaultValue={product.category}>
                    <SelectTrigger className="border-[#e8e8f0]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Brand</Label>
                  <Input defaultValue={product.brand} className="border-[#e8e8f0]" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#e8e8f0] p-6">
            <h3 className="font-bold text-gray-900 mb-5">Pricing & Inventory</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Price ($)</Label>
                <Input type="number" step="0.01" defaultValue={product.price} className="border-[#e8e8f0]" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Original Price ($)</Label>
                <Input type="number" step="0.01" defaultValue={product.originalPrice} className="border-[#e8e8f0]" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Stock</Label>
                <Input type="number" defaultValue={product.stock} className="border-[#e8e8f0]" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Weight</Label>
                <Input defaultValue={product.weight} className="border-[#e8e8f0]" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Unit</Label>
                <Input defaultValue={product.unit} className="border-[#e8e8f0]" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-[#e8e8f0] p-5">
            <h3 className="font-bold text-gray-900 mb-4">Product Image</h3>
            <div className="mb-3 rounded-xl overflow-hidden aspect-square bg-[#f8f8fd]">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="border-2 border-dashed border-[#e8e8f0] rounded-xl p-4 text-center cursor-pointer hover:border-[#635ad9] transition-colors">
              <Upload className="w-5 h-5 text-gray-300 mx-auto mb-1" />
              <p className="text-xs text-gray-500">Click to replace image</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#e8e8f0] p-5">
            <h3 className="font-bold text-gray-900 mb-4">Product Options</h3>
            <div className="space-y-3">
              {[
                { id: "isFeatured", label: "Featured Product", checked: product.isFeatured },
                { id: "isBestSeller", label: "Best Seller", checked: product.isBestSeller },
                { id: "isNew", label: "New Arrival", checked: product.isNew },
                { id: "isOrganic", label: "Organic Product", checked: product.isOrganic },
              ].map((opt) => (
                <div key={opt.id} className="flex items-center gap-2">
                  <Checkbox
                    id={opt.id}
                    defaultChecked={opt.checked}
                    className="border-[#e8e8f0] data-[state=checked]:bg-[#635ad9] data-[state=checked]:border-[#635ad9]"
                  />
                  <Label htmlFor={opt.id} className="text-sm text-gray-600 cursor-pointer">
                    {opt.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Button
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-[#635ad9] hover:bg-[#4f46e5] h-11 font-semibold"
            >
              {saving ? "Saving..." : "Update Product"}
            </Button>
            <Button asChild variant="outline" className="w-full border-[#e8e8f0]">
              <Link href="/dashboard/products">Cancel</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
