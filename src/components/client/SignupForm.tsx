"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { CredentialSignup, validateOtp } from "@/actions/SignupHandler";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

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
    const error = await CredentialSignup(name, email, password);

    if (!error) {
      setUserDetails({ name, email, password }); // Store user details
      setIsOtp(true); // Move to OTP input step
      toast.success("OTP sent to your email!", { id: toastId });
    } else {
      toast.error(String(error), { id: toastId });
    }
  };

  const handleOtpSubmit = async () => {
    if (userDetails) {
      const { name, email, password } = userDetails;
      validateOtp(name, email, password, otp)
        .then((isValid) => {
          if (isValid) {
            toast.success("Signup successful!");
            router.replace("/");
          } else {
            toast.error("invalid otp");
          }
        })
        .catch((error) => {
          console.log(error);
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
        <div className="flex flex-col justify-center align-middle">
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
