"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { gsap } from "gsap";
import { SlidersHorizontal, Grid3X3, List, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ProductCard from "@/components/ui/ProductCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { products, categories } from "@/lib/mock-data";
import { Suspense } from "react";

const ITEMS_PER_PAGE = 12;

const categoryNames = Array.from(new Set(products.map((p) => p.category)));
const brandNames = Array.from(new Set(products.map((p) => p.brand)));

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const initialQuery = searchParams.get("q") || "";

  const [view, setView] = useState<"grid" | "list">("grid");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [categoryNames.find(c => c.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-") === initialCategory) || ""] : []
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 20]);
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [organicOnly, setOrganicOnly] = useState(false);
  const [searchQuery] = useState(initialQuery);

  const filtered = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategories.length > 0 && selectedCategories[0] !== "") {
      result = result.filter((p) =>
        selectedCategories.includes(p.category)
      );
    }

    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (organicOnly) {
      result = result.filter((p) => p.isOrganic);
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "new":
        result = [...result.filter((p) => p.isNew), ...result.filter((p) => !p.isNew)];
        break;
      case "best-seller":
        result = [...result.filter((p) => p.isBestSeller), ...result.filter((p) => !p.isBestSeller)];
        break;
      default:
        result = [...result.filter((p) => p.isFeatured), ...result.filter((p) => !p.isFeatured)];
    }

    return result;
  }, [searchQuery, selectedCategories, selectedBrands, priceRange, sortBy, organicOnly]);

  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
    setCurrentPage(1);
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, 20]);
    setOrganicOnly(false);
    setCurrentPage(1);
  };

  const activeFilterCount =
    selectedCategories.filter(Boolean).length +
    selectedBrands.length +
    (organicOnly ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 20 ? 1 : 0);

  const FilterSidebar = () => (
    <div className="space-y-6">
      {activeFilterCount > 0 && (
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            Active Filters ({activeFilterCount})
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-red-500 hover:text-red-600 hover:bg-red-50 h-7 text-xs"
          >
            Clear All
          </Button>
        </div>
      )}

      {/* Categories */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3 text-sm">Categories</h4>
        <div className="space-y-2.5">
          {categoryNames.map((cat) => (
            <div key={cat} className="flex items-center gap-2">
              <Checkbox
                id={`cat-${cat}`}
                checked={selectedCategories.includes(cat)}
                onCheckedChange={() => toggleCategory(cat)}
                className="border-[#D1D5DB] data-[state=checked]:bg-[#6366F1] data-[state=checked]:border-[#6366F1]"
              />
              <Label
                htmlFor={`cat-${cat}`}
                className="text-sm text-gray-600 cursor-pointer"
              >
                {cat}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-[#D1D5DB]" />

      {/* Price Range */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3 text-sm">
          Price Range
        </h4>
        <Slider
          min={0}
          max={20}
          step={0.5}
          value={priceRange}
          onValueChange={(val) => setPriceRange(val as number[])}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>${priceRange[0].toFixed(2)}</span>
          <span>${priceRange[1].toFixed(2)}</span>
        </div>
      </div>

      <Separator className="bg-[#D1D5DB]" />

      {/* Organic filter */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3 text-sm">Options</h4>
        <div className="flex items-center gap-2">
          <Checkbox
            id="organic"
            checked={organicOnly}
            onCheckedChange={(checked) => {
              setOrganicOnly(!!checked);
              setCurrentPage(1);
            }}
            className="border-[#D1D5DB] data-[state=checked]:bg-[#6366F1] data-[state=checked]:border-[#6366F1]"
          />
          <Label
            htmlFor="organic"
            className="text-sm text-gray-600 cursor-pointer"
          >
            Organic Only
          </Label>
        </div>
      </div>

      <Separator className="bg-[#D1D5DB]" />

      {/* Brands */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3 text-sm">Brands</h4>
        <div className="space-y-2.5">
          {brandNames.map((brand) => (
            <div key={brand} className="flex items-center gap-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => toggleBrand(brand)}
                className="border-[#D1D5DB] data-[state=checked]:bg-[#6366F1] data-[state=checked]:border-[#6366F1]"
              />
              <Label
                htmlFor={`brand-${brand}`}
                className="text-sm text-gray-600 cursor-pointer"
              >
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.4, 
          stagger: 0.05, 
          ease: "power2.out",
          overwrite: "auto"
        }
      );
    }
  }, [paginated]);

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <div className="bg-white border-b border-[#D1D5DB] py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <SectionHeading
              title="Shop "
              highlight="Products"
              description={`${filtered.length} products found`}
            />
            <div className="flex items-center gap-3">
              {/* Mobile filter trigger */}
              <Sheet>
                <SheetTrigger className="lg:hidden border border-[#6366F1] text-[#6366F1] h-8 px-3 rounded-md text-xs font-medium flex items-center justify-center gap-2 hover:bg-[#6366F1]/10 transition-colors">
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                  {activeFilterCount > 0 && (
                    <Badge className="bg-[#6366F1] text-white h-4 w-4 p-0 flex items-center justify-center text-[10px]">
                      {activeFilterCount}
                    </Badge>
                  )}
                </SheetTrigger>
                <SheetContent side="left" className="w-72 overflow-y-auto">
                  <SheetHeader className="mb-4">
                    <SheetTitle>Filter Products</SheetTitle>
                  </SheetHeader>
                  <FilterSidebar />
                </SheetContent>
              </Sheet>

              <Select value={sortBy} onValueChange={(val: any) => setSortBy(val || "")}>
                <SelectTrigger className="w-44 h-9 border-[#D1D5DB] text-sm">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="new">New Arrivals</SelectItem>
                  <SelectItem value="best-seller">Best Sellers</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center gap-1 border border-[#D1D5DB] rounded-lg p-0.5">
                <button
                  onClick={() => setView("grid")}
                  className={`p-1.5 rounded-md transition-colors ${
                    view === "grid"
                      ? "bg-[#6366F1] text-white"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`p-1.5 rounded-md transition-colors ${
                    view === "list"
                      ? "bg-[#6366F1] text-white"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="bg-white rounded-2xl border border-[#D1D5DB] p-5 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#6366F1]" />
                Filter Products
              </h3>
              <FilterSidebar />
            </div>
          </aside>

          {/* Products grid */}
          <div className="flex-1 min-w-0">
            {/* Active filter chips */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedCategories.filter(Boolean).map((cat) => (
                  <Badge
                    key={cat}
                    variant="secondary"
                    className="gap-1 bg-[#EEF2FF] text-[#6366F1] border border-[#6366F1]/30"
                  >
                    {cat}
                    <button onClick={() => toggleCategory(cat)}>
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
                {selectedBrands.map((brand) => (
                  <Badge
                    key={brand}
                    variant="secondary"
                    className="gap-1 bg-[#EEF2FF] text-[#6366F1] border border-[#6366F1]/30"
                  >
                    {brand}
                    <button onClick={() => toggleBrand(brand)}>
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
                {organicOnly && (
                  <Badge
                    variant="secondary"
                    className="gap-1 bg-green-50 text-green-700 border border-green-200"
                  >
                    Organic Only
                    <button onClick={() => setOrganicOnly(false)}>
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
              </div>
            )}

            {paginated.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-6xl mb-4">🔍</p>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  Try adjusting your filters or search terms
                </p>
                <Button onClick={clearFilters} className="bg-[#6366F1] hover:bg-[#4F46E5]">
                  Clear Filters
                </Button>
              </div>
            ) : (
              <>
                <div
                  ref={gridRef}
                  className={
                    view === "grid"
                      ? "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5"
                      : "flex flex-col gap-4"
                  }
                >
                  {paginated.map((product) => (
                    <ProductCard key={product.id} product={product} view={view} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-10">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="border-[#D1D5DB]"
                    >
                      Previous
                    </Button>
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                          currentPage === i + 1
                            ? "bg-[#6366F1] text-white"
                            : "bg-white border border-[#D1D5DB] text-gray-600 hover:border-[#6366F1] hover:text-[#6366F1]"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="border-[#D1D5DB]"
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-64"><p className="text-gray-500">Loading products...</p></div>}>
      <ShopContent />
    </Suspense>
  );
}
