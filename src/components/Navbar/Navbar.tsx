import { ModeToggle } from "@/components/ThemeIcon";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-gray-900 dark:text-white"
        >
          MyWebsite
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-900 dark:text-gray-300">
            Home
          </Link>
          <Link href="/about" className="text-gray-900 dark:text-gray-300">
            About
          </Link>
          <Link href="/contact" className="text-gray-900 dark:text-gray-300">
            Contact
          </Link>
        </div>
        <ModeToggle />

        {/* ModeToggle */}
      </div>
    </nav>
  );
}
