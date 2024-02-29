import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGauge,
  faDumbbell,
  faPeopleGroup,
  faUser,
  faMagnifyingGlass,
  faShare,
  faMedal,
  faHeartPulse,
} from '@fortawesome/free-solid-svg-icons';
import SignOut from '@/components/SignOut';

export const AuthenticatedHeader = () => (
  <>
    <div className="lg:text-sm lg:flex-grow lg:flex lg:gap-4">
      <Link
        href="/dashboard"
        className="py-3 px-4 lg:py-1 lg:px-0 lg:inline flex gap-2 items-center"
      >
        <FontAwesomeIcon icon={faGauge} className="w-4 h-4 lg:hidden" />
        Dashboard
      </Link>
      <Link
        href="/exercises"
        className="py-3 px-4 lg:py-1 lg:px-0 lg:inline flex gap-2 items-center"
      >
        <FontAwesomeIcon icon={faDumbbell} className="w-4 h-4 lg:hidden" />
        Exercises
      </Link>
      <Link
        href="/workouts"
        className="py-3 px-4 lg:py-1 lg:px-0 lg:inline flex gap-2 items-center"
      >
        <FontAwesomeIcon icon={faHeartPulse} className="w-4 h-4 lg:hidden" />
        Workouts
      </Link>
      <Link
        href={`/teams`}
        className="py-3 px-4 lg:py-1 lg:px-0 lg:inline flex gap-2 items-center"
      >
        <FontAwesomeIcon icon={faPeopleGroup} className="w-4 h-4 lg:hidden" />
        Teams
      </Link>
      <Link
        href={`/account`}
        className="py-3 px-4 lg:py-1 lg:px-0 lg:inline flex gap-2 items-center"
      >
        <FontAwesomeIcon icon={faUser} className="w-4 h-4 lg:hidden" />
        Account
      </Link>
      <Link
        href="/user"
        className="py-3 px-4 lg:py-1 lg:px-0 lg:inline flex gap-2 items-center"
      >
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="w-4 h-4 lg:hidden"
        />
        Search for a User
      </Link>
      <Link
        href="/compare"
        className="py-3 px-4 lg:py-1 lg:px-0 lg:inline flex gap-2 items-center"
      >
        <FontAwesomeIcon icon={faMedal} className="w-4 h-4 lg:hidden" />
        Compare Users
      </Link>
      <Link
        href={`/public-profile`}
        className="py-3 px-4 lg:py-1 lg:px-0 lg:inline flex gap-2 items-center"
      >
        <FontAwesomeIcon icon={faShare} className="w-4 h-4 lg:hidden" />
        Your Public Profile
      </Link>
    </div>
    <div className="lg:text-sm flex gap-3 mt-4 lg:mt-0 px-4 pb-4 lg:px-0 lg:pb-0">
      <SignOut />
    </div>
  </>
);

export const UnauthenticatedHeader = () => (
  <>
    <div className="lg:text-sm lg:flex-grow lg:flex lg:gap-4">
      <Link href="/user" className="py-3 px-4 block lg:py-1 lg:px-0 lg:inline">
        Search for a User
      </Link>
      <Link
        href="/compare"
        className="py-3 px-4 block lg:py-1 lg:px-0 lg:inline"
      >
        Compare Users
      </Link>
    </div>
    <div className="p-4 lg:p-0 grid grid-cols-2 text-center lg:flex gap-3 mt-4 lg:mt-0 lg:text-sm">
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
