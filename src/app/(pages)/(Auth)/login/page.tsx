import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "@/components/auth/login/Login";
import SignupForm from "@/components/auth/signup/Signup";

export default function Page() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-20">
        <Tabs defaultValue="login" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">SignUp</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Login />
          </TabsContent>
          <TabsContent value="signup">
            <SignupForm />
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}
