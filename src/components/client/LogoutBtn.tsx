"use client";

import { signOut } from "next-auth/react";

export default function LogoutBtn(): JSX.Element {
  return (
    <p className="flex items-center gap-2" onClick={() => signOut()}>
      Logout
    </p>
  );
}
