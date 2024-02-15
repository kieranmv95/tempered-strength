"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import useUser from "@/app/hooks/useUser";

import TemperedStrengthSvg from "../../assets/TemperedStrength.svg";
import {
  AuthenticatedHeader,
  UnauthenticatedHeader,
} from "@/app/components/Header/Navigation";
import { SignedIn, SignedOut, useAuth } from "@clerk/nextjs";

const Header = () => {
  const { isSignedIn } = useAuth();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [navOpen, setNavOpen] = useState(false);
  const { data } = useUser();

  useEffect(() => {
    setNavOpen(false);
  }, [pathname, searchParams]);

  const hideHeader = (): boolean => {
    // Regular expression for /compare/username/username
    const comparePattern = /^\/compare\/[^/]+\/[^/]+$/;

    // Regular expression for /user/username
    const bestsPattern = /^\/user\/[^/]+$/;

    // Test the pathname against both patterns
    return comparePattern.test(pathname) || bestsPattern.test(pathname);
  };

  if (hideHeader()) return null;

  return (
    <header className="sticky top-0 left-0 z-20 bg-zinc-800">
      <nav className="flex items-center justify-between flex-wrap bg-zinc-700 p-4">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Link href={isSignedIn ? "/dashboard" : "/"}>
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
          <SignedIn>
            <AuthenticatedHeader username={data?.username} />
          </SignedIn>
          <SignedOut>
            <UnauthenticatedHeader />
          </SignedOut>
        </div>
      </nav>
    </header>
  );
};

export default Header;
