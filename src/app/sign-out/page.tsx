'use client';

import { useClerk } from '@clerk/nextjs';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/lib/hooks';
import { logout } from '@/lib/store';

export default function SignOut() {
  const { signOut } = useClerk();
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    signOut(() => {
      router.push('/');
      dispatch(logout());
    });
  }, []);

  return null;
}
