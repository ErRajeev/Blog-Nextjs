import { signIn } from "@/app/auth";
import SignupForm from "@/components/client/SignupForm";
import SvgFacebookLogo from "@/components/svgs/SvgFacebookLogo";
import SvgGitHubLogo from "@/components/svgs/SvgGitHubLogo";
import SvgGoogleLogo from "@/components/svgs/SvgGoogleLogo";
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
          <CardTitle>SignUp</CardTitle>
          <CardDescription>Please Enter Details</CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm />
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <p>or</p>
          <div className="flex justify-between gap-x-10">
            <form
              action={async () => {
                "use server";
                await signIn("google");
              }}
            >
              <Button
                variant="outline"
                type="submit"
                className="flex items-center gap-2"
                size={"icon"}
              >
                <SvgGoogleLogo />
              </Button>
            </form>
            <form
              action={async () => {
                "use server";
                await signIn("google");
              }}
            >
              <Button
                variant="outline"
                type="submit"
                className="flex items-center gap-2"
                size={"icon"}
              >
                <SvgGitHubLogo />
              </Button>
            </form>
            <form
              action={async () => {
                "use server";
                await signIn("google");
              }}
            >
              <Button
                variant="outline"
                type="submit"
                className="flex items-center gap-2"
                size={"icon"}
              >
                <SvgFacebookLogo />
              </Button>
            </form>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};
export default Page;
