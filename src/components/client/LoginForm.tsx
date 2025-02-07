"use client";

import { CredentialLogin } from "@/actions/LoginHandler";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function LoginForm(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (formData: FormData) => {
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString().trim();

    if (!email || !password) return toast.error("Plese enter credentials");
    setLoading(true);
    const toastId = toast.loading("Logging in...");

    try {
      const response: { success: boolean; message: string } =
        await CredentialLogin(email, password);

      if (response.success) {
        await getSession();
        toast.success(response.message, { id: toastId });
        router.replace("/");
      }
      if (!response.success) {
        toast.error(response.message, { id: toastId });
      }
    } catch (err) {
      toast.error("An unexpected error occurred. Please try again.", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!loading) {
          const formData = new FormData(e.currentTarget);
          await handleLogin(formData);
        }
      }}
    >
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          placeholder="Email"
          name="email"
          required
          autoComplete="off"
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
          autoComplete="off"
        />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
