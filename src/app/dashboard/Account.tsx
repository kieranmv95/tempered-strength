'use client';

import useUser from '@/hooks/useUser';

const Profile = () => {
  const user = useUser();

  return (
    <>
      {!user.loading && !user.err && !user?.data?.weight && (
        <div className="p-2 bg-red-500 rounded mb-3 inline-block text-sm">
          <span className="font-bold">No weight logged!</span> Log your weight
          to start doing pound for pound comparisons
        </div>
      )}
    </>
  );
};

export default Profile;
