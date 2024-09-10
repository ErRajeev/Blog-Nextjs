"use client";
import { useAuth } from "./context/AuthContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) router.push("/login");

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        main page {user?.name}
      </main>
    </>
  );
}
