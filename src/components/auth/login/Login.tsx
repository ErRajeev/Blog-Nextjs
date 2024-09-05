import LoginForm from "@/components/client/LoginForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Page: React.FC = (): JSX.Element => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Please Enter Login Details</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <p>or</p>
          <hr className="sol" />
          <form action="">
            <Button variant="outline">Login With Google</Button>
          </form>
        </CardFooter>
      </Card>
    </>
  );
};

export default Page;
