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
  const [isOtp, setIsOtp] = useState(false);
  const [otp, setOtp] = useState<string>(""); // OTP storage
  const [userDetails, setUserDetails] = useState<{
    name: string;
    email: string;
    password: string;
  } | null>(null);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name || !email || !password) {
      return toast.error("Please Enter Credentials");
    }

    const toastId = toast.loading("Signing...");
    const res = await CredentialSignup(name, email, password);

    if (res === true) {
      setUserDetails({ name, email, password }); // Store user details
      setIsOtp(true); // Move to OTP input step
      toast.success("OTP sent to your email!", { id: toastId });
    } else {
      toast.error(String(res), { id: toastId });
    }
  };

  const handleOtpSubmit = async () => {
    const toastId = toast.loading("Logging...");
    if (userDetails) {
      const { name, email, password } = userDetails;
      validateSignupOtp(name, email, password, otp)
        .then((response) => {
          if (response.success) {
            toast.success(response.message, { id: toastId });
            router.replace("/");
          }
        })
        .catch((error) => {
          toast.error(String(error.message), { id: toastId });
        });
    }
  };

  useEffect(() => {
    if (otp.length === 6) handleOtpSubmit();
  }, [otp]);

  return (
    <>
      {!isOtp ? (
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
            <Input type="text" id="name" placeholder="Your Name" name="name" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" name="email" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="Password"
              name="password"
            />
          </div>
          <Button type="submit">SignUp</Button>
        </form>
      ) : (
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
      )}
    </>
  );
}
