"use client";

import Link from "next/link";
import {
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Users,
  Package,
  DollarSign,
  ArrowRight,
  MoreHorizontal,
  Eye,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { dashboardStats, weeklyRevenueData, orders, products } from "@/lib/mock-data";
import { formatPrice, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const statusColors: Record<string, string> = {
  delivered: "bg-green-50 text-green-700 border-green-200",
  shipped: "bg-blue-50 text-blue-700 border-blue-200",
  processing: "bg-yellow-50 text-yellow-700 border-yellow-200",
  pending: "bg-orange-50 text-orange-700 border-orange-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
};

const stats = [
  {
    label: "Total Revenue",
    value: formatPrice(dashboardStats.totalRevenue),
    change: dashboardStats.revenueChange,
    icon: DollarSign,
    color: "text-[#635ad9] bg-[#f5f3ff]",
  },
  {
    label: "Total Orders",
    value: dashboardStats.totalOrders.toLocaleString(),
    change: dashboardStats.ordersChange,
    icon: ShoppingCart,
    color: "text-blue-600 bg-blue-50",
  },
  {
    label: "Customers",
    value: dashboardStats.totalCustomers.toLocaleString(),
    change: dashboardStats.customersChange,
    icon: Users,
    color: "text-green-600 bg-green-50",
  },
  {
    label: "Total Products",
    value: dashboardStats.totalProducts.toLocaleString(),
    change: dashboardStats.productsChange,
    icon: Package,
    color: "text-[#fbb400] bg-amber-50",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-[#e8e8f0] shadow-none hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-500">{stat.label}</p>
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", stat.color)}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
              <p className="text-2xl font-extrabold text-gray-900">{stat.value}</p>
              <div className="flex items-center gap-1 mt-1.5">
                {stat.change >= 0 ? (
                  <TrendingUp className="w-3.5 h-3.5 text-[#4baf4f]" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5 text-red-500" />
                )}
                <span
                  className={cn(
                    "text-xs font-medium",
                    stat.change >= 0 ? "text-[#4baf4f]" : "text-red-500"
                  )}
                >
                  {Math.abs(stat.change)}%
                </span>
                <span className="text-xs text-gray-400">vs last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Revenue chart */}
        <Card className="lg:col-span-2 border-[#e8e8f0] shadow-none">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-bold text-gray-900">
                Weekly Revenue
              </CardTitle>
              <Badge variant="secondary" className="bg-[#f5f3ff] text-[#635ad9] border-0 text-xs">
                This Week
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={weeklyRevenueData}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#635ad9" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#635ad9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f8" />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e8e8f0",
                    fontSize: "12px",
                  }}
                  formatter={(value: any) => [`$${value.toLocaleString()}`, "Revenue"]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#635ad9"
                  strokeWidth={2.5}
                  fill="url(#revenueGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Orders chart */}
        <Card className="border-[#e8e8f0] shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold text-gray-900">
              Daily Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={weeklyRevenueData} barSize={20}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f8" />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e8e8f0",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="orders" fill="#635ad9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent orders + Top products */}
      <div className="grid lg:grid-cols-5 gap-5">
        {/* Recent orders */}
        <Card className="lg:col-span-3 border-[#e8e8f0] shadow-none">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-bold text-gray-900">
                Recent Orders
              </CardTitle>
              <Button asChild variant="ghost" size="sm" className="text-[#635ad9] h-8 text-xs gap-1">
                <Link href="/dashboard/orders">
                  View All <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {orders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#f8f8fd] transition-colors">
                  <Avatar className="w-9 h-9 shrink-0">
                    <AvatarImage src={order.customer.avatar} />
                    <AvatarFallback>{order.customer.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {order.customer.name}
                    </p>
                    <p className="text-xs text-gray-400 font-mono">
                      {order.orderNumber}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-gray-900">
                      {formatPrice(order.total)}
                    </p>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-[10px] border capitalize mt-0.5",
                        statusColors[order.status]
                      )}
                    >
                      {order.status}
                    </Badge>
                  </div>
                  <Link href={`/dashboard/orders/${order.id}`} className="text-gray-400 hover:text-[#635ad9] transition-colors shrink-0 ml-1">
                    <Eye className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top products */}
        <Card className="lg:col-span-2 border-[#e8e8f0] shadow-none">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-bold text-gray-900">
                Top Products
              </CardTitle>
              <Button asChild variant="ghost" size="sm" className="text-[#635ad9] h-8 text-xs gap-1">
                <Link href="/dashboard/products">
                  View All <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {products
                .filter((p) => p.isBestSeller)
                .slice(0, 5)
                .map((product, i) => (
                  <div key={product.id} className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-400 w-4 shrink-0">
                      {i + 1}
                    </span>
                    <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#f8f8fd] shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-900 line-clamp-1">
                        {product.name}
                      </p>
                      <p className="text-[11px] text-gray-400">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-gray-500">
                        {product.reviewCount}
                      </p>
                      <p className="text-[10px] text-gray-400">reviews</p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
