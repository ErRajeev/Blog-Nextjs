import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "@/components/auth/login/Login";
import Signup from "@/components/auth/signup/Signup";

export default function Page() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-20">
        <Tabs defaultValue="signup" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">SignUp</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Login />
          </TabsContent>
          <TabsContent value="signup">
            <Signup />
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}
