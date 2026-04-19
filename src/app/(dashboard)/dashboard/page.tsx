"use client";

import Link from "next/link";
import {
  DollarSign,
  ShoppingBag,
  Users,
  FileText,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { dashboardStats, weeklyRevenueData, orders, products } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const stats = [
  {
    label: "Total Income",
    value: formatPrice(dashboardStats.totalRevenue),
    icon: DollarSign,
  },
  {
    label: "Total Order",
    value: dashboardStats.totalOrders.toLocaleString(),
    icon: ShoppingBag,
  },
  {
    label: "Total Customer",
    value: dashboardStats.totalCustomers.toLocaleString(),
    icon: Users,
  },
];

export default function DashboardOverviewPage() {
  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-8 bg-white p-8 rounded-xl border border-[#E5E7EB] min-h-[calc(100vh-8rem)]">
      
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-[#F3F4F6] rounded-2xl p-6 flex flex-col justify-between items-start relative h-32"
            >
              <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              
              <Icon className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 text-gray-400 stroke-[1.5]" />
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Main Chart Column */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Chart Header */}
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold text-gray-900">Overview</h3>
            <div className="flex items-center gap-6">
              <div className="flex gap-4 text-xs font-semibold text-gray-600">
                <span className="flex items-center gap-1.5 before:w-2 before:h-2 before:rounded-full before:bg-[#2563EB]">Income</span>
                <span className="flex items-center gap-1.5 before:w-2 before:h-2 before:rounded-full before:bg-[#10B981]">Order</span>
                <span className="flex items-center gap-1.5 before:w-2 before:h-2 before:rounded-full before:bg-gray-300">Total Customer</span>
              </div>
              <select className="text-xs font-medium text-gray-500 bg-transparent focus:outline-none border-0 pr-4">
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
          </div>

          {/* Chart Area */}
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyRevenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  labelStyle={{ fontWeight: 'bold', color: '#1F2937' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#2563EB" 
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="orders" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="customers" 
                  stroke="#D1D5DB" 
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Order List Table */}
          <div className="pt-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-900">Order list</h2>
              <Button asChild className="bg-[#6366F1] hover:bg-[#4F46E5] text-white text-xs px-6 py-2 h-auto rounded-lg">
                <Link href="/dashboard/orders">See All</Link>
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-900 border-b border-[#E5E7EB]">
                    <th className="pb-4 font-bold">Order number</th>
                    <th className="pb-4 font-bold">Name</th>
                    <th className="pb-4 font-bold">Product Category</th>
                    <th className="pb-4 font-bold">Product name</th>
                    <th className="pb-4 font-bold">Email address</th>
                    <th className="pb-4 font-bold">Price</th>
                    <th className="pb-4 font-bold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB]">
                  {recentOrders.map((order) => {
                    const primaryItem = order.items[0];
                    const category = products.find(p => p.id === primaryItem.productId)?.category || "Variable";
                    
                    return (
                      <tr key={order.id} className="text-gray-600">
                        <td className="py-4">{order.orderNumber}</td>
                        <td className="py-4">{order.customer.name}</td>
                        <td className="py-4">{category}</td>
                        <td className="py-4">{primaryItem.productName}</td>
                        <td className="py-4">{order.customer.email}</td>
                        <td className="py-4 font-medium text-gray-900">{formatPrice(order.total)}</td>
                        <td className="py-4">
                          <Link href={`/dashboard/orders/${order.id}`} className="text-gray-400 hover:text-gray-900 block border border-gray-200 rounded p-1.5 w-max">
                            <FileText className="w-4 h-4" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
