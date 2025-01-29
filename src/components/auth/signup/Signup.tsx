import GoogleLogin from "@/components/auth/googleLogin/GoogleLogin";
import SignupForm from "@/components/client/SignupForm";
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
          <CardTitle>SignUp</CardTitle>
          <CardDescription>Please Enter SignUp Details</CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm />
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <p>or</p>
          <GoogleLogin />
        </CardFooter>
      </Card>
    </>
  );
};
export default Page;
