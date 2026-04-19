'use client'

import { Heart } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ui/ProductCard';
import { useWishlistStore } from '@/store/wishlist';

type Props = {}

const WishListPage = (props: Props) => {
  const wishlistItems = useWishlistStore((s) => s.items);
  return (
    <section>
      <div>
        <h2 className="font-bold text-gray-900 text-lg mb-5">
          My Wishlist ({wishlistItems.length})
        </h2>
        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#D1D5DB] p-12 text-center">
            <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-500 text-sm mb-4">Save products you love to find them easily later.</p>
            <Button asChild className="bg-[#6366F1] hover:bg-[#4F46E5]">
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
    </section>
  )
}

export default WishListPage