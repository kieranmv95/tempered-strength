'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import useUser from '@/hooks/useUser';

const Profile = () => {
  const user = useUser();

  return (
    <div className="bg-zinc-700 p-4">
      <h2 className="text-xl font-bold mb-3">Account</h2>
      {!user.loading && !user.err && !user?.data?.weight && (
        <div className="p-2 bg-red-500 rounded mb-3 inline-block text-sm">
          <span className="font-bold">No weight logged!</span> Log your weight
          to start doing pound for pound comparisons
        </div>
      )}
      <p className="mb-3">
        Customise your username and add your weight in the user Account Section
      </p>
      <Link
        className="inline-block bg-blue-600 hover:bg-blue-700 click:bg-red-600 py-2 px-4 rounded"
        href="/account"
      >
        Update Info
      </Link>
    </div>
  );
};

export default Profile;
