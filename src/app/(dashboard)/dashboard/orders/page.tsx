"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Filter, Download, Eye, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { orders } from "@/lib/mock-data";
import { formatPrice, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const statusColors: Record<string, string> = {
  delivered: "bg-green-50 text-green-700 border-green-200",
  shipped: "bg-blue-50 text-blue-700 border-blue-200",
  processing: "bg-yellow-50 text-yellow-700 border-yellow-200",
  pending: "bg-orange-50 text-orange-700 border-orange-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
};

const tabs = ["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = orders.filter((o) => {
    const matchTab = activeTab === "All" || o.status.toLowerCase() === activeTab.toLowerCase();
    const matchSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.name.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Orders</h1>
          <p className="text-sm text-gray-500">{orders.length} total orders</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2 border-[#e8e8f0]">
          <Download className="w-3.5 h-3.5" />
          Export
        </Button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 overflow-x-auto pb-1 bg-white rounded-xl border border-[#e8e8f0] p-1 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all",
              activeTab === tab
                ? "bg-[#635ad9] text-white shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            {tab}
            {tab !== "All" && (
              <span className="ml-1.5 text-[10px] opacity-70">
                ({orders.filter((o) => o.status === tab.toLowerCase()).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative w-72">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
        <Input
          placeholder="Search orders or customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-8 h-9 text-sm border-[#e8e8f0]"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#e8e8f0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#e8e8f0] bg-[#f8f8fd]">
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="py-3.5 px-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f0f8]">
              {filtered.map((order) => (
                <tr key={order.id} className="hover:bg-[#f8f8fd] transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-medium text-[#635ad9] text-xs">
                      {order.orderNumber}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <Avatar className="w-7 h-7">
                        <AvatarImage src={order.customer.avatar} />
                        <AvatarFallback className="text-[10px]">
                          {order.customer.name.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900 text-xs">
                          {order.customer.name}
                        </p>
                        <p className="text-[10px] text-gray-400">
                          {order.customer.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-gray-500">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="py-3.5 px-4 text-xs text-gray-600">
                    {order.items.length} items
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-gray-900 text-sm">
                      {formatPrice(order.total)}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge
                      variant="outline"
                      className={cn("capitalize text-[10px] border", statusColors[order.status])}
                    >
                      {order.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge
                      variant="outline"
                      className={cn(
                        "capitalize text-[10px] border",
                        order.paymentStatus === "paid"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : order.paymentStatus === "pending"
                          ? "bg-orange-50 text-orange-700 border-orange-200"
                          : "bg-red-50 text-red-700 border-red-200"
                      )}
                    >
                      {order.paymentStatus}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="h-7 w-7 flex items-center justify-center rounded-md hover:bg-accent transition-colors">
                        <MoreHorizontal className="w-3.5 h-3.5" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Link href={`/dashboard/orders/${order.id}`} className="w-full">
                          <DropdownMenuItem>
                            View Details
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem>Mark as Processing</DropdownMenuItem>
                        <DropdownMenuItem>Mark as Shipped</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500">
                          Cancel Order
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-10 text-gray-400">
              <p>No orders found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
