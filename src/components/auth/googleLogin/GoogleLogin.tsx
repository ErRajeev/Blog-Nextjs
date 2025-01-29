import { signIn } from "@/app/auth";
import SvgFacebookLogo from "@/components/svgs/SvgFacebookLogo";
import SvgGitHubLogo from "@/components/svgs/SvgGitHubLogo";
import SvgGoogleLogo from "@/components/svgs/SvgGoogleLogo";
import { Button } from "@/components/ui/button";

export const Page: React.FC = (): JSX.Element => {
  return (
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
  );
};
export default Page;
