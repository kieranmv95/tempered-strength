'use client';

import { SignedIn } from '@clerk/nextjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDumbbell,
  faHeartPulse,
  faHome,
  faPeopleGroup,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { usePathname } from 'next/navigation';

const ActiveLink = ({ href, icon }: { href: string; icon: IconDefinition }) => {
  const pathname = usePathname();
  const active = pathname.startsWith(href);

  return (
    <Link href={href} className="grid items-center justify-center relative">
      <FontAwesomeIcon icon={icon} className="w-6 h-6" />
      {active && (
        <div className="absolute w-2 h-2 bg-rand-400 rounded-full self-center justify-self-center mt-10" />
      )}
    </Link>
  );
};

const BottomNav = () => (
  <SignedIn>
    <div className="bg-egwene-500 fixed bottom-0 left-0 w-full h-12 h-[64px] lg:hidden">
      <nav className="w-full mx-auto max-w-[320px] h-full grid grid-cols-5 text-rand-500">
        <ActiveLink href="/dashboard" icon={faHome} />
        <ActiveLink href="/account" icon={faUser} />
        <ActiveLink href="/exercises" icon={faDumbbell} />
        <ActiveLink href="/workouts" icon={faHeartPulse} />
        <ActiveLink href="/teams" icon={faPeopleGroup} />
      </nav>
    </div>
  </SignedIn>
);

export default BottomNav;
