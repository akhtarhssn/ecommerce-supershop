import { Badge } from '@/components/ui/badge'
import { orders } from '@/lib/mock-data'
import { cn, formatDate, formatPrice } from '@/lib/utils'
import React from 'react'
import { statusColors } from '../layout'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type Props = {}

const OrderPage = (props: Props) => {
  return (
    <section>
      <div className="space-y-4">
        <h2 className="font-bold text-gray-900 text-lg">
          Order History ({orders.length})
        </h2>
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-2xl border border-[#D1D5DB] p-5">
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
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#F9FAFB]">
                    <img src={item.productImage} alt={item.productName} className="w-full h-full object-cover" />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500">
                {order.items.length} item{order.items.length > 1 ? "s" : ""} · {order.paymentMethod}
              </p>
              <Button asChild variant="outline" size="sm" className="border-[#6366F1] text-[#6366F1] h-8 text-xs">
                <Link href={`/account/orders/${order.id}`}>View Details</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default OrderPage