"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import useUser from "@/app/hooks/useUser";

import TemperedStrengthSvg from "../../assets/TemperedStrength.svg";

const Header = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [navOpen, setNavOpen] = useState(false);
  const { data } = useUser();

  useEffect(() => {
    setNavOpen(false);
  }, [pathname, searchParams]);

  return (
    <header>
      <nav className="flex items-center justify-between flex-wrap bg-zinc-700 p-4">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Link href="/">
            <Image
              src={TemperedStrengthSvg}
              alt="Primary Logo"
              width={400}
              height={188}
              className="w-36"
              priority
            />
          </Link>
        </div>
        <div className="block lg:hidden">
          <button
            className="flex items-center px-3 py-2 border rounded text-amber-400 border-amber-400 hover:text-amber-100 hover:border-amber-100"
            onClick={() => setNavOpen(!navOpen)}
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div
          className={`${!navOpen && "hidden"} w-full block flex-grow lg:flex lg:items-center lg:w-auto`}
        >
          <div className="grid text-sm lg:flex-grow mt-4 lg:mt-0 lg:flex lg:gap-4">
            <SignedIn>
              <Link href="/dashboard" className="py-2">
                Dashboard
              </Link>
              <Link href="/exercises" className="py-2">
                Exercises
              </Link>
              {!!data && (
                <Link href={`/bests/${data.username}`} className="py-2">
                  Profile
                </Link>
              )}
            </SignedIn>
          </div>
          <div className="text-sm flex gap-3 mt-4 lg:mt-0">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <Link
                className="block bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded"
                href="/sign-in"
              >
                Sign in
              </Link>
              <Link
                className="block py-2 px-4 rounded hover:underline"
                href="/sign-up"
              >
                Sign up
              </Link>
            </SignedOut>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
