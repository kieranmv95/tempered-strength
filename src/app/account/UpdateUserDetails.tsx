"use client";

import useUser from "@/app/hooks/useUser";
import UpdateUsername from "@/app/account/UpdateUsername";
import UpdateWeight from "@/app/account/UpdateWeight";

const UpdateUserDetails = () => {
  const user = useUser();

  if (user.loading) return <div>Loading</div>;
  if (user.err) return <div>Error</div>;
  if (!user.data) return null;

  return (
    <div className="bg-zinc-600 rounded p-4 grid gap-4">
      <UpdateUsername user={user.data} />
      <UpdateWeight user={user.data} />
    </div>
  );
};

export default UpdateUserDetails;
