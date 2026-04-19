"use client";

import Link from "next/link";
import { ArrowLeft, Upload, Plus, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const categoryOptions = [
  "Fresh Vegetables", "Fresh Fruits", "Dairy & Eggs", "Meat & Fish", "Bakery", "Beverages", "Snacks", "Organic"
];

export default function AddProductPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [images, setImages] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);
    toast.success("Product added successfully!");
    router.push("/dashboard/products");
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="sm" className="gap-2 text-gray-600">
          <Link href="/dashboard/products">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </Button>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Add New Product</h1>
          <p className="text-sm text-gray-500">Fill in the details below</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-3 gap-5">
          {/* Main info */}
          <div className="lg:col-span-2 space-y-5">
            {/* Basic info */}
            <div className="bg-white rounded-2xl border border-[#e8e8f0] p-6">
              <h3 className="font-bold text-gray-900 mb-5">Basic Information</h3>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Product Name *</Label>
                  <Input
                    {...register("name", { required: true })}
                    placeholder="e.g., Organic Fresh Tomatoes"
                    className={cn("border-[#e8e8f0]", errors.name && "border-red-400")}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Description *</Label>
                  <textarea
                    {...register("description", { required: true })}
                    rows={4}
                    placeholder="Describe the product in detail..."
                    className="w-full rounded-lg border border-[#e8e8f0] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#635ad9]/20 focus:border-[#635ad9] resize-none"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-sm font-medium">Category *</Label>
                    <Select>
                      <SelectTrigger className="border-[#e8e8f0]">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryOptions.map((c) => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm font-medium">Brand</Label>
                    <Input {...register("brand")} placeholder="e.g., Farm Fresh" className="border-[#e8e8f0]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-2xl border border-[#e8e8f0] p-6">
              <h3 className="font-bold text-gray-900 mb-5">Pricing & Inventory</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Regular Price ($) *</Label>
                  <Input
                    type="number"
                    step="0.01"
                    {...register("price", { required: true })}
                    placeholder="0.00"
                    className={cn("border-[#e8e8f0]", errors.price && "border-red-400")}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Original Price ($)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    {...register("originalPrice")}
                    placeholder="0.00"
                    className="border-[#e8e8f0]"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Stock Quantity *</Label>
                  <Input
                    type="number"
                    {...register("stock", { required: true })}
                    placeholder="0"
                    className={cn("border-[#e8e8f0]", errors.stock && "border-red-400")}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Unit</Label>
                  <Select>
                    <SelectTrigger className="border-[#e8e8f0]">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {["kg", "g", "lb", "piece", "pack", "bottle", "loaf", "pot", "jar", "bag", "fillet"].map((u) => (
                        <SelectItem key={u} value={u}>{u}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Weight/Size</Label>
                  <Input {...register("weight")} placeholder="e.g., 500g" className="border-[#e8e8f0]" />
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-2xl border border-[#e8e8f0] p-6">
              <h3 className="font-bold text-gray-900 mb-4">Tags</h3>
              <div className="flex gap-2 mb-3">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  placeholder="Add a tag and press Enter"
                  className="border-[#e8e8f0]"
                />
                <Button type="button" onClick={addTag} variant="outline" className="border-[#635ad9] text-[#635ad9] shrink-0">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span key={tag} className="flex items-center gap-1 bg-[#f5f3ff] text-[#635ad9] text-xs px-2.5 py-1 rounded-full">
                      {tag}
                      <button type="button" onClick={() => setTags(tags.filter((t) => t !== tag))}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right panel */}
          <div className="space-y-5">
            {/* Image upload */}
            <div className="bg-white rounded-2xl border border-[#e8e8f0] p-5">
              <h3 className="font-bold text-gray-900 mb-4">Product Images</h3>
              <div className="border-2 border-dashed border-[#e8e8f0] rounded-xl p-6 text-center hover:border-[#635ad9] transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">
                  Drag & drop or{" "}
                  <span className="text-[#635ad9] cursor-pointer">browse</span>
                </p>
                <p className="text-[10px] text-gray-400 mt-1">PNG, JPG up to 10MB</p>
              </div>
              {images.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {images.map((img, i) => (
                    <div key={i} className="relative rounded-lg overflow-hidden aspect-square bg-[#f8f8fd]">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product flags */}
            <div className="bg-white rounded-2xl border border-[#e8e8f0] p-5">
              <h3 className="font-bold text-gray-900 mb-4">Product Options</h3>
              <div className="space-y-3">
                {[
                  { id: "isFeatured", label: "Featured Product" },
                  { id: "isBestSeller", label: "Best Seller" },
                  { id: "isNew", label: "New Arrival" },
                  { id: "isOrganic", label: "Organic Product" },
                ].map((opt) => (
                  <div key={opt.id} className="flex items-center gap-2">
                    <Checkbox
                      id={opt.id}
                      className="border-[#e8e8f0] data-[state=checked]:bg-[#635ad9] data-[state=checked]:border-[#635ad9]"
                    />
                    <Label htmlFor={opt.id} className="text-sm text-gray-600 cursor-pointer">
                      {opt.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#635ad9] hover:bg-[#4f46e5] h-11 font-semibold"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </span>
                ) : (
                  "Save Product"
                )}
              </Button>
              <Button type="button" variant="outline" className="w-full border-[#e8e8f0]" asChild>
                <Link href="/dashboard/products">Cancel</Link>
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
