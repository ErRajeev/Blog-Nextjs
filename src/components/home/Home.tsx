"use client";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data }: { data: Session | null } = useSession();
  return (
    <div>
      <p>Welcome {data?.user?.name || "Guest"}!</p>
      <p>{data?.user?.email}</p>
    </div>
  );
}
