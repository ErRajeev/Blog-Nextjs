"use client";

import { CredentialSignup, validateSignupOtp } from "@/actions/SignupHandler";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function SignupForm(): JSX.Element {
  const [step, setStep] = useState<"signup" | "otp">("signup");
  const [otp, setOtp] = useState<string>("");
  const [userDetails, setUserDetails] = useState<{
    name: string;
    email: string;
    password: string;
  } | null>(null);

  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString().trim();

    if (!name || !email || !password) {
      return toast.error("Please enter all credentials.");
    }

    const toastId = toast.loading("Signing up...");

    try {
      const res = await CredentialSignup(name, email, password);
      if (res.success) {
        setUserDetails({ name, email, password });
        setStep("otp");
        toast.success("OTP sent to your email!", { id: toastId });
      } else {
        toast.error(res.message, { id: toastId });
      }
    } catch (error) {
      toast.error("Signup failed. Please try again.", { id: toastId });
    }
  };

  useEffect(() => {
    if (otp.length !== 6 || !userDetails) return;

    const verifyOtp = async () => {
      const toastId = toast.loading("Verifying OTP...");

      try {
        const response = await validateSignupOtp(
          userDetails.name,
          userDetails.email,
          userDetails.password,
          otp
        );

        if (response.success) {
          toast.success(response.message, { id: toastId });
          router.replace("/");
        } else {
          toast.error(response.message, { id: toastId });
        }
      } catch (error) {
        toast.error("OTP verification failed. Try again.", { id: toastId });
      }
    };

    verifyOtp();
  }, [otp, userDetails, router]);

  return (
    <>
      {step === "signup" ? (
        <form
          className="flex flex-col gap-4"
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            await handleSubmit(formData);
          }}
        >
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              placeholder="Your Name"
              name="name"
              required
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Email"
              name="email"
              required
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="Password"
              name="password"
              required
            />
          </div>
          <Button type="submit">Sign Up</Button>
        </form>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>
              Your Email: <strong>{userDetails?.email}</strong>
            </Label>
          </div>
          <Label htmlFor="otp">Enter OTP</Label>
          <div className="flex justify-center gap-1.5">
            <InputOTP
              maxLength={6}
              name="otp"
              className="grid w-full max-w-sm items-center gap-1.5"
              onChange={setOtp}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>
      )}
    </>
  );
}
