'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components';

export default function SignOut() {
  const router = useRouter();

  return (
    <Button
      type="button"
      theme="egwene"
      onClick={() => router.push('/sign-out')}
    >
      Sign out
    </Button>
  );
}
