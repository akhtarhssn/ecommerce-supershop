"use client";

import { useState } from "react";
import { Bell, Shield, Store, User, Globe, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

export default function SettingsPage() {
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500">Manage your store and account preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-5">
        <TabsList className="bg-white border border-[#D1D5DB] h-11 p-1 rounded-xl">
          {[
            { value: "profile", label: "Profile", icon: User },
            { value: "store", label: "Store", icon: Store },
            { value: "notifications", label: "Notifications", icon: Bell },
            { value: "security", label: "Security", icon: Shield },
          ].map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="text-xs gap-1.5 rounded-lg data-[state=active]:bg-[#6366F1] data-[state=active]:text-white"
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Profile */}
        <TabsContent value="profile">
          <div className="bg-white rounded-2xl border border-[#D1D5DB] p-6 space-y-6">
            <h3 className="font-bold text-gray-900">Profile Information</h3>
            <div className="flex items-center gap-5">
              <Avatar className="w-16 h-16">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm" className="border-[#6366F1] text-[#6366F1]">
                Change Photo
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: "First Name", defaultValue: "Admin", id: "fname" },
                { label: "Last Name", defaultValue: "User", id: "lname" },
                { label: "Email", defaultValue: "admin@supershop.com", id: "email", type: "email" },
                { label: "Phone", defaultValue: "+1 800 123 4567", id: "phone" },
              ].map((field) => (
                <div key={field.id} className="space-y-1.5">
                  <Label className="text-sm font-medium">{field.label}</Label>
                  <Input defaultValue={field.defaultValue} type={field.type || "text"} className="border-[#D1D5DB]" />
                </div>
              ))}
            </div>
            <Button onClick={handleSave} disabled={saving} className="bg-[#6366F1] hover:bg-[#4F46E5]">
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </TabsContent>

        {/* Store */}
        <TabsContent value="store">
          <div className="bg-white rounded-2xl border border-[#D1D5DB] p-6 space-y-6">
            <h3 className="font-bold text-gray-900">Store Settings</h3>
            <div className="space-y-4">
              {[
                { label: "Store Name", defaultValue: "supershop", id: "storeName" },
                { label: "Store Email", defaultValue: "hello@supershop.com", id: "storeEmail" },
                { label: "Store Phone", defaultValue: "+1 800 123 4567", id: "storePhone" },
                { label: "Store Address", defaultValue: "123 Green Market St, New York, NY", id: "storeAddress" },
              ].map((field) => (
                <div key={field.id} className="space-y-1.5">
                  <Label className="text-sm font-medium">{field.label}</Label>
                  <Input defaultValue={field.defaultValue} className="border-[#D1D5DB]" />
                </div>
              ))}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Currency</Label>
                <Input defaultValue="USD ($)" className="border-[#D1D5DB]" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Tax Rate (%)</Label>
                <Input type="number" defaultValue="10" className="border-[#D1D5DB]" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Free Shipping Threshold ($)</Label>
                <Input type="number" defaultValue="50" className="border-[#D1D5DB]" />
              </div>
            </div>
            <Button onClick={handleSave} disabled={saving} className="bg-[#6366F1] hover:bg-[#4F46E5]">
              {saving ? "Saving..." : "Save Store Settings"}
            </Button>
          </div>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <div className="bg-white rounded-2xl border border-[#D1D5DB] p-6 space-y-5">
            <h3 className="font-bold text-gray-900">Notification Preferences</h3>
            <div className="space-y-4">
              {[
                { label: "New Order Notifications", desc: "Get notified when a new order is placed" },
                { label: "Low Stock Alerts", desc: "Alert when product stock falls below 10 units" },
                { label: "Customer Reviews", desc: "Get notified when a customer leaves a review" },
                { label: "Payment Confirmations", desc: "Receive payment success/failure notifications" },
                { label: "Weekly Reports", desc: "Receive weekly performance reports via email" },
                { label: "Marketing Emails", desc: "Receive tips and marketing recommendations" },
              ].map((notif) => (
                <div key={notif.label} className="flex items-start justify-between gap-4 py-3 border-b border-[#E5E7EB] last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{notif.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{notif.desc}</p>
                  </div>
                  <div className="w-10 h-5 bg-[#6366F1] rounded-full relative cursor-pointer shrink-0 mt-0.5">
                    <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security">
          <div className="bg-white rounded-2xl border border-[#D1D5DB] p-6 space-y-6">
            <h3 className="font-bold text-gray-900">Security Settings</h3>
            <div className="space-y-4 max-w-sm">
              <h4 className="font-semibold text-gray-700 text-sm">Change Password</h4>
              {[
                { label: "Current Password", id: "currentPass" },
                { label: "New Password", id: "newPass" },
                { label: "Confirm New Password", id: "confirmPass" },
              ].map((field) => (
                <div key={field.id} className="space-y-1.5">
                  <Label className="text-sm font-medium">{field.label}</Label>
                  <Input type="password" placeholder="••••••••" className="border-[#D1D5DB]" />
                </div>
              ))}
              <Button onClick={() => toast.success("Password updated!")} className="bg-[#6366F1] hover:bg-[#4F46E5]">
                Update Password
              </Button>
            </div>

            <Separator className="bg-[#D1D5DB]" />

            <div>
              <h4 className="font-semibold text-gray-700 text-sm mb-3">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-500 mb-3">
                Add an extra layer of security to your account.
              </p>
              <Button variant="outline" className="border-[#6366F1] text-[#6366F1]">
                Enable 2FA
              </Button>
            </div>

            <Separator className="bg-[#D1D5DB]" />

            <div>
              <h4 className="font-semibold text-red-500 text-sm mb-3">Danger Zone</h4>
              <Button variant="destructive" size="sm" onClick={() => toast.error("This action requires additional confirmation.")}>
                Delete Account
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
