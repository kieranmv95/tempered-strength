import { query } from "@/db";
import { ILoggingType } from "@/app/api/user/exercises/route";
import UserPublicProfile from "@/app/components/UserPublicProfile";
import CopyUrlToClipboard from "@/app/components/CopyUrlToClipboard";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

const getUserData = async (username: string) => {
  const user = (await query(`
    SELECT ue.log, ue.date, e.name, e.logging_type
    FROM (
        SELECT userId, exerciseId, MAX(log) as MaxLog
        FROM userExercises
        GROUP BY userId, exerciseId
    ) as max_ue
    JOIN userExercises ue ON max_ue.userId = ue.userId AND max_ue.exerciseId = ue.exerciseId AND max_ue.MaxLog = ue.log
    JOIN users u ON ue.userId = u.id
    JOIN exercises e ON ue.exerciseId = e.id
    WHERE u.username = '${username}';
  `)) as {
    log: string;
    date: Date;
    name: string;
    logging_type: ILoggingType;
  }[];

  if (!user.length) {
    return Promise.resolve([]);
  } else {
    return Promise.resolve(user);
  }
};

const getUsername = async (userId: string) => {
  const user = (await query(
    `SELECT username FROM users WHERE id = '${userId}';`,
  )) as {
    username: string;
  }[];

  return user[0].username;
};

export default async function Page() {
  const { userId } = auth();
  console.log("userId", userId);
  const username = await getUsername(userId || "");
  console.log("username", username);
  const user = await getUserData(username);
  console.log(user, user);

  return (
    <>
      <div className="px-4 py-12 container mx-auto">
        <h2 className="text-2xl font-bold lg:text-4xl mb-4">
          Your Public Profile
        </h2>
        <p>
          Below is a representation of what a user will see when they search for
          yourself or navigate tou your public profile!
        </p>
        <h2 className="text-xl font-bold lg:text-2xl mb-3 mt-6">
          Share your profile with the world!
        </h2>
        <p>
          Now you have a public profile, you can start sharing it with your
          friends! Simply click the button below, or copy the link from the text
          box to get started
        </p>
        <CopyUrlToClipboard
          url={`https://temperedstrength.com/user/${username}`}
        >
          Click here to copy your public user profile to the clipboard
        </CopyUrlToClipboard>
      </div>
      <div className="relative grid justify-center">
        <div className="h-[4px] w-full bg-red-700 absolute top-[18px] left-0 z-[2]" />
        <div className="h-[2px] w-full bg-red-300 absolute top-[19px] left-0 z-[3]" />
        <div className="inline-block mx-auto bg-red-300 p-2 text-red-700 font-bold rounded z-[4] border border-red-700">
          Public Profile Below
        </div>
      </div>
      {!user.length ? (
        <div className="px-4 py-12 container mx-auto">
          <h2 className="text-xl font-bold lg:text-2xl mb-3 mt-6">
            Nothing to see here!
          </h2>
          <p className="mb-3">
            Don&apos;t worry, nothings broken, you just need to start logging
            exercises
          </p>
          <Link
            href="/exercises"
            className="inline block bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded"
          >
            Log your first Exercise
          </Link>
        </div>
      ) : (
        <UserPublicProfile
          username={username}
          user={user}
          copyToClipboard={false}
        />
      )}
    </>
  );
}
