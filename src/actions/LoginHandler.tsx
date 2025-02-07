"use server";

import { signIn } from "@/app/auth";

const CredentialLogin = async (email: string, password: string) => {
  if (!email || !password)
    return { success: false, message: "Please provide credential" };

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return { success: true, message: "Loggin successfull." };
  } catch (error) {
    return { success: false, message: "Loggin failed." };
  }
};

export { CredentialLogin };
