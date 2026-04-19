'use client'

import { toast } from "sonner";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

type Props = {}

const SettingsPage = (props: Props) => {
  return (
    <section>
      <div className="bg-white rounded-2xl border border-[#D1D5DB] p-6 space-y-6">
        <h2 className="font-bold text-gray-900 text-lg">Account Settings</h2>

        <div>
          <h3 className="font-semibold text-gray-900 mb-3 text-sm">Change Password</h3>
          <div className="space-y-3 max-w-sm">
            <Input type="password" placeholder="Current password" className="border-[#D1D5DB]" />
            <Input type="password" placeholder="New password" className="border-[#D1D5DB]" />
            <Input type="password" placeholder="Confirm new password" className="border-[#D1D5DB]" />
            <Button className="bg-[#6366F1] hover:bg-[#4F46E5] w-full" onClick={() => toast.success("Password updated!")}>
              Update Password
            </Button>
          </div>
        </div>

        <Separator className="bg-[#D1D5DB]" />

        <div>
          <h3 className="font-semibold text-gray-900 mb-3 text-sm">Notifications</h3>
          <div className="space-y-3">
            {[
              "Order status updates",
              "Newsletter and promotions",
              "New product alerts",
              "Price drop alerts",
            ].map((notif) => (
              <div key={notif} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{notif}</span>
                <div className="w-10 h-5 bg-[#6366F1] rounded-full relative cursor-pointer">
                  <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-[#D1D5DB]" />

        <div>
          <h3 className="font-semibold text-red-500 mb-3 text-sm">Danger Zone</h3>
          <Button variant="destructive" size="sm" onClick={() => toast.error("Account deletion requires confirmation via email.")}>
            Delete Account
          </Button>
        </div>
      </div>
    </section>
  )
}

export default SettingsPage