import GoogleLogin from "@/components/auth/googleLogin/GoogleLogin";
import ForgetPassword from "@/components/client/ForgetPassword";
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
          <CardTitle>Forget Password</CardTitle>
          <CardDescription>Please Enter Credential</CardDescription>
        </CardHeader>
        <CardContent>
          <ForgetPassword />
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
