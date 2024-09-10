"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { CredentialLogin } from "@/actions/LoginHandler";
import { useRouter } from "next/navigation";

export default function LoginForm(): JSX.Element {
  const router = useRouter();

  const handleLogin = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    if (!email || !password)
      return toast.error("Plese enter email or password");

    const toastId = toast.loading("Logging...");
    const error = await CredentialLogin(email, password);

    if (!error) {
      toast.success("Login Successfull!", {
        id: toastId,
      });
      router.replace("/");
    } else {
      toast.error(String(error), {
        id: toastId,
      });
    }
  };

  return (
    <>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          handleLogin(formData);
        }}
      >
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
        <Button type="submit">Login</Button>
      </form>
    </>
  );
}
