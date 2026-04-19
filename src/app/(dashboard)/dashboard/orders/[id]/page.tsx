import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Printer, Download, CheckCircle2, Truck, Package, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { orders } from "@/lib/mock-data";
import { formatPrice, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const statusSteps = ["pending", "processing", "shipped", "delivered"];

const statusColors: Record<string, string> = {
  delivered: "bg-green-50 text-green-700 border-green-200",
  shipped: "bg-blue-50 text-blue-700 border-blue-200",
  processing: "bg-yellow-50 text-yellow-700 border-yellow-200",
  pending: "bg-orange-50 text-orange-700 border-orange-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
};

export default async function OrderInvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = orders.find((o) => o.id === id);
  if (!order) return notFound();

  const currentStep = order.status === "cancelled" ? -1 : statusSteps.indexOf(order.status);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="sm" className="gap-2 text-gray-600">
            <Link href="/dashboard/orders">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-bold text-gray-900 font-mono">
              {order.orderNumber}
            </h1>
            <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2 border-[#D1D5DB]">
            <Printer className="w-3.5 h-3.5" />
            Print
          </Button>
          <Button size="sm" className="gap-2 bg-[#6366F1] hover:bg-[#4F46E5]">
            <Download className="w-3.5 h-3.5" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Progress tracker */}
      {order.status !== "cancelled" && (
        <div className="bg-white rounded-2xl border border-[#D1D5DB] p-6">
          <h3 className="font-semibold text-gray-900 mb-5 text-sm">Order Status</h3>
          <div className="flex items-center">
            {statusSteps.map((step, i) => (
              <div key={step} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all",
                      i <= currentStep
                        ? "bg-[#6366F1] text-white"
                        : "bg-gray-100 text-gray-400"
                    )}
                  >
                    {i < currentStep ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      i + 1
                    )}
                  </div>
                  <p
                    className={cn(
                      "text-xs font-medium mt-1.5 capitalize",
                      i <= currentStep ? "text-[#6366F1]" : "text-gray-400"
                    )}
                  >
                    {step}
                  </p>
                </div>
                {i < statusSteps.length - 1 && (
                  <div
                    className={cn(
                      "flex-1 h-0.5 mx-2 transition-all",
                      i < currentStep ? "bg-[#6366F1]" : "bg-gray-200"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Invoice */}
        <div className="lg:col-span-2 space-y-5">
          {/* Items */}
          <div className="bg-white rounded-2xl border border-[#D1D5DB] overflow-hidden">
            <div className="p-5 border-b border-[#D1D5DB]">
              <h3 className="font-bold text-gray-900">Order Items</h3>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F9FAFB] border-b border-[#D1D5DB]">
                  <th className="text-left py-3 px-5 text-xs font-semibold text-gray-500">Product</th>
                  <th className="text-right py-3 px-5 text-xs font-semibold text-gray-500">Price</th>
                  <th className="text-right py-3 px-5 text-xs font-semibold text-gray-500">Qty</th>
                  <th className="text-right py-3 px-5 text-xs font-semibold text-gray-500">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {order.items.map((item) => (
                  <tr key={item.productId}>
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#F9FAFB] shrink-0">
                          <img src={item.productImage} alt={item.productName} className="w-full h-full object-cover" />
                        </div>
                        <span className="font-medium text-gray-900 text-sm">{item.productName}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-right text-gray-600">
                      {formatPrice(item.price)}
                    </td>
                    <td className="py-4 px-5 text-right text-gray-600">
                      {item.quantity}
                    </td>
                    <td className="py-4 px-5 text-right font-bold text-gray-900">
                      {formatPrice(item.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-5 border-t border-[#D1D5DB] space-y-2">
              {[
                { label: "Subtotal", value: formatPrice(order.subtotal) },
                { label: "Shipping", value: order.shipping === 0 ? "Free" : formatPrice(order.shipping) },
                { label: "Tax", value: formatPrice(order.tax) },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between text-sm text-gray-600">
                  <span>{label}</span>
                  <span>{value}</span>
                </div>
              ))}
              <Separator className="bg-[#D1D5DB]" />
              <div className="flex justify-between font-bold text-base">
                <span>Total</span>
                <span className="text-[#6366F1]">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Info cards */}
        <div className="space-y-4">
          {/* Customer */}
          <div className="bg-white rounded-2xl border border-[#D1D5DB] p-5">
            <h3 className="font-bold text-gray-900 mb-4 text-sm">Customer</h3>
            <div className="flex items-center gap-3 mb-3">
              <img src={order.customer.avatar} alt={order.customer.name} className="w-10 h-10 rounded-full bg-[#EEF2FF]" />
              <div>
                <p className="font-semibold text-gray-900 text-sm">{order.customer.name}</p>
                <p className="text-xs text-gray-500">{order.customer.email}</p>
              </div>
            </div>
            <div className="space-y-1.5 text-xs text-gray-500">
              <p>📞 {order.customer.phone}</p>
              <p>📦 {order.customer.totalOrders} total orders</p>
            </div>
          </div>

          {/* Shipping address */}
          <div className="bg-white rounded-2xl border border-[#D1D5DB] p-5">
            <h3 className="font-bold text-gray-900 mb-3 text-sm">Shipping Address</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {order.shippingAddress.street}<br />
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
              {order.shippingAddress.country}
            </p>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-2xl border border-[#D1D5DB] p-5">
            <h3 className="font-bold text-gray-900 mb-3 text-sm">Payment</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Method</span>
                <span className="font-medium">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status</span>
                <Badge
                  variant="outline"
                  className={cn(
                    "capitalize text-[10px] border",
                    order.paymentStatus === "paid"
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-orange-50 text-orange-700 border-orange-200"
                  )}
                >
                  {order.paymentStatus}
                </Badge>
              </div>
            </div>
          </div>

          {/* Status badge */}
          <div className="bg-white rounded-2xl border border-[#D1D5DB] p-5">
            <h3 className="font-bold text-gray-900 mb-3 text-sm">Order Status</h3>
            <Badge
              variant="outline"
              className={cn("capitalize border text-sm px-3 py-1", statusColors[order.status])}
            >
              {order.status}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
