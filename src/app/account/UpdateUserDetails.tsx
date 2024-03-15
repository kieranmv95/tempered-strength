'use client';

import useUser from '@/hooks/useUser';
import UpdateUsername from '@/app/account/UpdateUsername';
import UpdateWeight from '@/app/account/UpdateWeight';

const UpdateUserDetails = () => {
  const user = useUser();

  if (user.loading || !user.data) return <div>Loading...</div>;
  if (user.err) return <div>Error</div>;

  return (
    <>
      <UpdateUsername user={user.data} />
      <UpdateWeight user={user.data} />
    </>
  );
};

export default UpdateUserDetails;
