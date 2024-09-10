"use client";
import { useAuth } from "@/app/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { JSX, SVGProps } from "react";
import LogoutBtn from "../client/LogoutBtn";
import SvgUserLoginin from "../svgs/SvgUserLogin";
import { ModeToggle } from "../ThemeIcon";

export default function Component() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <MountainIcon className="h-6 w-6" />
          <span className="text-lg font-bold">Blog</span>
        </Link>

        <nav className="hidden md:flex items-center gap-4">
          <Link
            href="/"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Home
          </Link>
          <Link
            href="/blogs"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Blog
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Contact Us
          </Link>
        </nav>

        {/* Right Side: Mode Toggle and User Menu */}
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                {user ? (
                  <>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.image} />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </>
                ) : (
                  <Link href="/login">
                    <SvgUserLoginin />
                  </Link>
                )}
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            {user && (
              <DropdownMenuContent align="end">
                <div className="flex items-center gap-2 p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.image} />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-0.5 leading-none">
                    <div className="font-semibold">{user?.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {user?.email}
                    </div>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link
                    href="#"
                    className="flex items-center gap-2"
                    prefetch={false}
                  >
                    <div className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="#"
                    className="flex items-center gap-2"
                    prefetch={false}
                  >
                    <div className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link
                    href="#"
                    className="flex items-center gap-2"
                    prefetch={false}
                  >
                    <div className="h-4 w-4" />
                    <LogoutBtn />
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            )}
          </DropdownMenu>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}

function MountainIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
