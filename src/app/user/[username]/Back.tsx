'use client';

import BackButton from '@/components/BackButton';
import { SignedIn } from '@clerk/nextjs';

const Back = () => (
  <SignedIn>
    <div className="inline-block mx-auto mt-12 px-4">
      <BackButton>Back</BackButton>
    </div>
  </SignedIn>
);

export default Back;
