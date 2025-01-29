import Forget from "@/components/auth/forget/ForgetPassword";
import Login from "@/components/auth/login/Login";
import SignupForm from "@/components/auth/signup/Signup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (session) redirect("/");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-20">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">SignUp</TabsTrigger>
          <TabsTrigger value="forget">Forget</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="signup">
          <SignupForm />
        </TabsContent>
        <TabsContent value="forget">
          <Forget />
        </TabsContent>
      </Tabs>
    </main>
  );
}
