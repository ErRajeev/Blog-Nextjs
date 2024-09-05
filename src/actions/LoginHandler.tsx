"use server";

import { signIn } from "@/app/auth";
import { CredentialsSignin } from "next-auth";

const CredentialLogin = async (email: string, password: string) => {
  if (!email || !password) throw new Error("Please provide all field");

  try {
    await signIn("credentials", {
      email,
      password,
    });
  } catch (error) {
    const err = error as CredentialsSignin;
    return err.cause;
  }
};

export { CredentialLogin };
