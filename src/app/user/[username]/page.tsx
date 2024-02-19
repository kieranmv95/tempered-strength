import { query } from "@/db";
import BackButton from "@/components/BackButton";
import { ILoggingType } from "@/app/api/user/exercises/route";
import UserPublicProfile from "@/components/UserPublicProfile";

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
    return Promise.resolve(null);
  } else {
    return Promise.resolve(user);
  }
};

type PageProps = {
  params: {
    username: string;
  };
};

export default async function Page({ params }: PageProps) {
  const user = await getUserData(params.username);

  if (!user) {
    return (
      <div className="text-center">
        <div className="inline-block mx-auto mt-12">
          <BackButton href="/user">Search for another user</BackButton>
        </div>
        <h1 className="text-2xl">
          user not found or user has not logged any lifts yet!
        </h1>
      </div>
    );
  }

  return (
    <>
      <div className="mt-3 ml-4">
        <BackButton href="/user">Search for another user</BackButton>
      </div>
      <UserPublicProfile username={params.username} user={user} />
    </>
  );
}
