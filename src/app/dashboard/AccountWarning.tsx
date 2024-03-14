'use client';

import useUser from '@/hooks/useUser';
import Link from 'next/link';

const AccountWarning = () => {
  const user = useUser();

  if (!user.data) return null;

  return (
    <>
      {!user.loading && !user.err && !user?.data?.weight && (
        <div className="p-4 bg-danger-500 rounded-xl inline-block mb-6 lg:mb-8 lg:p-6">
          <p className="font-bold mb-2">Action Required!</p>
          <p className="mb-3">
            No weight logged in your account, Log your weight to start doing
            pound for pound comparisons
          </p>
          <Link
            href="/account"
            className="inline-block bg-egwene-500 py-2 px-4 rounded-full text-rand-500"
          >
            Account
          </Link>
        </div>
      )}
    </>
  );
};

export default AccountWarning;
