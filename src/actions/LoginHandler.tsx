"use server";

import { signIn } from "@/app/auth";
import { CredentialsSignin } from "next-auth";

const CredentialLogin = async (email: string, password: string) => {
  if (!email || !password) throw new Error("Please provide all field");
  try {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return null;
  } catch (error) {
    const err = error as CredentialsSignin;
    return err.cause;
  }
};

export { CredentialLogin };
