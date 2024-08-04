import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import dbConnect from "@/lib/DataBase/utils";
import User from "@/app/api/models/userModel";
import { hash } from "bcryptjs";
import { redirect } from "next/navigation";

export const Page: React.FC = (): JSX.Element => {
  const handleSubmit = async (formData: FormData) => {
    "use server";

    const name = formData.get("name") as string | undefined;
    const email = formData.get("email") as string | undefined;
    const password = formData.get("password") as string | undefined;

    if (!name || !password || !email) {
      return new Error("Enter the Details");
    }

    // Db connect

    try {
      await dbConnect();
      const user = await User.findOne({ email });
      if (user) {
        return new Error("User allready Exist");
      }

      const hashedPassword = await hash(password, 10);
      await User.create({
        name,
        email,
        password: hashedPassword,
      });
      // redirect("/");
    } catch (error) {
      console.error("Error during signup:", error);
      // alert("Error during signup. Please try again.");
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>SignUp</CardTitle>
          <CardDescription>Please Enter Details</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="flex flex-col gap-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                placeholder="Your Name"
                name="name"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="Email" name="email" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Password"
                name="password"
              />
            </div>
            <Button type="submit">SignUp</Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <p>or</p>
          <form action="">
            <Button variant="outline">SignUp With Google</Button>
          </form>
        </CardFooter>
      </Card>
    </>
  );
};
export default Page;
