'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import TemperedStrengthSvg from '../../assets/TemperedStrength.svg';
import {
  AuthenticatedHeader,
  UnauthenticatedHeader,
} from '@/components/Header/Navigation';
import { SignedIn, SignedOut, useAuth } from '@clerk/nextjs';

const Header = () => {
  const { isSignedIn } = useAuth();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    setNavOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
      <header className="sticky top-0 left-0 z-20 bg-zinc-800">
        <nav className="flex items-center justify-between flex-wrap bg-zinc-700 p-4">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <Link href={isSignedIn ? '/dashboard' : '/'}>
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
            className={`${!navOpen && 'hidden'} fixed top-[74px] left-0 bg-zinc-700 w-[80%] h-[calc(100%-74px)] max-w-sm grid grid-rows-[1fr_auto] lg:relative lg:top-0 lg:h-auto lg:flex lg:flex-grow lg:w-auto lg:max-w-none lg:items-center`}
          >
            <SignedIn>
              <AuthenticatedHeader />
            </SignedIn>
            <SignedOut>
              <UnauthenticatedHeader />
            </SignedOut>
          </div>
        </nav>
      </header>
      <div
        className={
          navOpen
            ? 'fixed top-0 left-0 bg-black w-full h-full opacity-70 cursor-pointer lg:hidden z-10'
            : ''
        }
        onClick={() => setNavOpen(false)}
      />
    </>
  );
};

export default Header;
