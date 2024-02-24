import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export const AuthenticatedHeader = () => (
  <>
    <div className="text-sm lg:flex-grow lg:flex lg:gap-4">
      <Link
        href="/dashboard"
        className="py-3 px-4 block lg:py-1 lg:px-0 lg:inline"
      >
        Dashboard
      </Link>
      <Link
        href="/exercises"
        className="py-3 px-4 block lg:py-1 lg:px-0 lg:inline"
      >
        Exercises
      </Link>
      <Link
        href={`/teams`}
        className="py-3 px-4 block lg:py-1 lg:px-0 lg:inline"
      >
        Teams
      </Link>
      <Link
        href={`/account`}
        className="py-3 px-4 block lg:py-1 lg:px-0 lg:inline"
      >
        Account
      </Link>
      <Link href="/user" className="py-3 px-4 block lg:py-1 lg:px-0 lg:inline">
        Search for a User
      </Link>
      <Link
        href="/compare"
        className="py-3 px-4 block lg:py-1 lg:px-0 lg:inline"
      >
        Compare Users
      </Link>
      <Link
        href={`/public-profile`}
        className="py-3 px-4 block lg:py-1 lg:px-0 lg:inline"
      >
        Your Public Profile
      </Link>
    </div>
    <div className="text-sm flex gap-3 mt-4 lg:mt-0 px-4 pb-4 lg:px-0 lg:pb-0">
      <UserButton afterSignOutUrl="/" />
    </div>
  </>
);

export const UnauthenticatedHeader = () => (
  <>
    <div className="grid text-sm lg:flex-grow mt-4 lg:mt-0 lg:flex lg:gap-4">
      <Link href="/user" className="py-2 px-4">
        Search for a User
      </Link>
      <Link href="/compare" className="py-2 px-4">
        Compare Users
      </Link>
    </div>
    <div className="text-sm flex gap-3 mt-4 lg:mt-0">
      <Link
        className="block bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded"
        href="/sign-in"
      >
        Sign in
      </Link>
      <Link className="block py-2 px-4 rounded hover:underline" href="/sign-up">
        Sign up
      </Link>
    </div>
  </>
);
