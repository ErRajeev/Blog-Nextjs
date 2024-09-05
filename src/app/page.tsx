import { redirect } from "next/navigation";
import { auth } from "./auth";
import LogoutBtn from "@/components/client/LogoutBtn";

export default async function Home() {
  const session = await auth();
  const user = session?.user;
  // console.log(user);
  if (!user) {
    redirect("/login");

    // console.log("MONGODB_URI:", process.env.MONGODB_URI);
  }
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        main page
        <LogoutBtn />
      </main>
    </>
  );
}
