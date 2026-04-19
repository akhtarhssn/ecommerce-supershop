"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, UserPlus, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
};

export default function SignupPage() {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();

  const password = watch("password");

  const onSubmit = async (data: FormData) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }
    if (!data.terms) {
      toast.error("Please accept the terms and conditions.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    toast.success("Account created! Welcome to supershop!");
    router.push("/");
  };

  const passwordStrength = password
    ? password.length < 6 ? "weak" : password.length < 10 ? "medium" : "strong"
    : null;

  return (
    <div className="min-h-screen bg-[#f8f8fd] flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#4baf4f] to-[#16a34a] items-center justify-center p-12 relative overflow-hidden">
        <div className="relative z-10 text-center text-white">
          <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl font-black">N</span>
          </div>
          <h2 className="text-3xl font-extrabold mb-3">
            Join supershop Today!
          </h2>
          <p className="text-white/80 text-lg max-w-xs mx-auto mb-8">
            Create your account and start enjoying fresh groceries delivered to your door.
          </p>
          <div className="space-y-3 text-left">
            {[
              "Free delivery on orders over $50",
              "Exclusive member discounts & deals",
              "Easy order tracking & management",
              "Priority customer support",
            ].map((benefit) => (
              <div key={benefit} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-white/80 shrink-0" />
                <span className="text-white/90 text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
        <div className="w-full max-w-md py-6">
          <div className="lg:hidden flex items-center gap-2 mb-6">
            <div className="w-9 h-9 rounded-xl bg-[#635ad9] flex items-center justify-center">
              <span className="text-white font-bold">N</span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              Super<span className="text-[#635ad9]">pal</span>
            </span>
          </div>

          <h1 className="text-2xl font-extrabold text-gray-900 mb-1">Create Account</h1>
          <p className="text-gray-500 text-sm mb-6">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-[#635ad9] font-semibold hover:underline">
              Sign in
            </Link>
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">First Name</Label>
                <Input
                  {...register("firstName", { required: "Required" })}
                  placeholder="John"
                  className={cn("border-[#e8e8f0] h-11", errors.firstName && "border-red-400")}
                />
                {errors.firstName && <p className="text-xs text-red-500">{errors.firstName.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Last Name</Label>
                <Input
                  {...register("lastName", { required: "Required" })}
                  placeholder="Doe"
                  className={cn("border-[#e8e8f0] h-11", errors.lastName && "border-red-400")}
                />
                {errors.lastName && <p className="text-xs text-red-500">{errors.lastName.message}</p>}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Email Address</Label>
              <Input
                type="email"
                {...register("email", { required: "Email required" })}
                placeholder="you@example.com"
                className={cn("border-[#e8e8f0] h-11", errors.email && "border-red-400")}
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Password</Label>
              <div className="relative">
                <Input
                  type={showPass ? "text" : "password"}
                  {...register("password", { required: "Password required", minLength: { value: 6, message: "Min 6 characters" } })}
                  placeholder="Create a strong password"
                  className={cn("border-[#e8e8f0] h-11 pr-10", errors.password && "border-red-400")}
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
              {passwordStrength && (
                <div className="flex gap-1 mt-1">
                  {["weak", "medium", "strong"].map((level) => (
                    <div
                      key={level}
                      className={`flex-1 h-1 rounded-full ${passwordStrength === "strong" ? "bg-[#4baf4f]" :
                        passwordStrength === "medium" && level !== "strong" ? "bg-[#fbb400]" :
                          passwordStrength === "weak" && level === "weak" ? "bg-red-500" :
                            "bg-gray-200"
                        }`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Confirm Password</Label>
              <Input
                type="password"
                {...register("confirmPassword", { required: "Please confirm password" })}
                placeholder="Repeat your password"
                className={cn("border-[#e8e8f0] h-11", errors.confirmPassword && "border-red-400")}
              />
            </div>

            <div className="flex items-start gap-2">
              <Checkbox id="terms" {...register("terms")} className="mt-0.5 border-[#e8e8f0] data-[state=checked]:bg-[#635ad9] data-[state=checked]:border-[#635ad9]" />
              <Label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer leading-relaxed">
                I agree to the{" "}
                <Link href="#" className="text-[#635ad9] hover:underline">Terms of Service</Link>{" "}
                and{" "}
                <Link href="#" className="text-[#635ad9] hover:underline">Privacy Policy</Link>
              </Label>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-[#635ad9] hover:bg-[#4f46e5] font-semibold shadow-lg shadow-[#635ad9]/25"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Create Account
                </>
              )}
            </Button>
          </form>

          <div className="relative my-5">
            <Separator className="bg-[#e8e8f0]" />
            <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#f8f8fd] px-3 text-xs text-gray-400">
              or sign up with
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-11 border-[#e8e8f0] gap-2 font-medium">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" alt="Google" />
              Google
            </Button>
            <Button variant="outline" className="h-11 border-[#e8e8f0] gap-2 font-medium">
              <img src="https://www.svgrepo.com/show/448224/facebook.svg" className="w-4 h-4" alt="Facebook" />
              Facebook
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
