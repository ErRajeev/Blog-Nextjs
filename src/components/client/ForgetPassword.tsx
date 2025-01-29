"use client";

import {
  CredentialForgetPass,
  validateForgetPassOtp,
} from "@/actions/ForgetPassHandler";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
  const [isOtp, setIsOtp] = useState(false);

  const [otp, setOtp] = useState<string>("");
  const [newpassword, setNewassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  const handleForget = async () => {
    const toastId = toast.loading("Logging...");

    if (!email) return toast.error("Plese enter email");

    const res = await CredentialForgetPass(email);

    if (res === true) {
      setIsOtp(true);
      toast.success("OTP sent to your email!", { id: toastId });
    } else {
      toast.error(String(res), {
        id: toastId,
      });
    }
  };

  const handleOtpSubmit = async () => {
    const toastId = toast.loading("Logging...");

    if (!otp || !newpassword) return toast.error("Plese enter otp or password");

    validateForgetPassOtp(email, newpassword, otp)
      .then((response) => {
        if (response.success) {
          toast.success(response.message);
          router.replace("/");
        }
      })
      .catch((error) => {
        toast.error(String(error.message), {
          id: toastId,
        });
      });
  };

  return (
    <>
      {!isOtp ? (
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleForget();
          }}
        >
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button type="submit">Forget</Button>
        </form>
      ) : (
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleOtpSubmit();
          }}
        >
          <div className="flex justify-center align-middle">
            <InputOTP
              maxLength={6}
              className="grid w-full max-w-sm items-center gap-1.5"
              onChange={(value) => setOtp(value)}
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
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="password">New Password</Label>
            <Input
              type="password"
              id="newpassword"
              placeholder="New Password"
              name="newpassword"
              value={newpassword}
              onChange={(e) => setNewassword(e.target.value)}
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      )}
    </>
  );
}
