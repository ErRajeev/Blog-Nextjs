// src/components/client/LogoutBtn.tsx
"use client"; // Make sure this component is treated as a client component

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function LogoutBtn(): JSX.Element {
  return <Button onClick={() => signOut()}>Logout</Button>;
}
