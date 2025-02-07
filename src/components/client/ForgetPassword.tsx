"use client";

import {
  CredentialForgetPass,
  validateForgetPassOtp,
} from "@/actions/ForgetPassHandler";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";
import { Label } from "../ui/label";

export default function ForgetPassword(): JSX.Element {
  const [step, setStep] = useState<"request" | "verify">("verify");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [cnfPassword, setCnfPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  const handleForget = useCallback(async () => {
    if (!email.trim()) return toast.error("Please enter a valid email.");

    setLoading(true);
    const toastId = toast.loading("Sending OTP...");

    try {
      const response = await CredentialForgetPass(email.trim());
      if (response.success) {
        setStep("verify");
        toast.success(response.message, { id: toastId });
      } else {
        toast.error(response.message, { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId });
    } finally {
      setLoading(false);
    }
  }, [email]);

  const handleOtpSubmit = useCallback(async () => {
    if (!otp.trim() || !newPassword.trim())
      return toast.error("Please enter OTP.");
    if (!newPassword.trim()) return toast.error("Please enter new password.");
    if (newPassword.trim() !== cnfPassword.trim())
      return toast.error("Passwords don't match.");

    setLoading(true);
    const toastId = toast.loading("Verifying OTP...");
    try {
      const response = await validateForgetPassOtp(email, newPassword, otp);
      if (response.success) {
        toast.success(response.message, { id: toastId });
        router.replace("/");
      } else {
        toast.error(response.message, { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId });
    } finally {
      setLoading(false);
    }
  }, [cnfPassword, email, newPassword, otp, router]);

  return (
    <>
      {step === "request" && (
        <form
          className="flex flex-col gap-4"
          onSubmit={async (e) => {
            e.preventDefault();
            if (!loading) await handleForget();
          }}
        >
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              name="email"
              required
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send OTP"}
          </Button>
        </form>
      )}
      {step === "verify" && (
        <form
          className="flex flex-col gap-4 justify-center align-middle"
          onSubmit={(e) => {
            e.preventDefault();
            if (!loading) handleOtpSubmit();
          }}
        >
          <Label htmlFor="">Your Email: {email}</Label>
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            type="password"
            id="newPassword"
            placeholder="Enter new password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Label htmlFor="cnfPassword">Confirm new Password</Label>
          <Input
            type="password"
            id="cnfPassword"
            placeholder="Confirm new password"
            required
            value={cnfPassword}
            onChange={(e) => setCnfPassword(e.target.value)}
          />
          <Label>Enter OTP</Label>
          <div className="flex justify-center gap-1.5">
            <InputOTP maxLength={6} onChange={setOtp}>
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
          <Button type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Submit"}
          </Button>
        </form>
      )}
    </>
  );
}
