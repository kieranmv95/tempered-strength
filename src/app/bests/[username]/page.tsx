import { query } from "@/db";

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
  `)) as { log: string; date: Date; name: string; logging_type: string }[];

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
        <h1 className="text-2xl md:text-4xl font-bold mt-12">user not found</h1>
      </div>
    );
  }

  return (
    <div className="text-center px-4 w-full max-w-[600px] mx-auto">
      <h1 className="text-2xl md:text-4xl font-bold mt-12">
        @{params.username}
      </h1>
      <div className="grid gap-3 mt-6">
        {user.map((exercise) => (
          <div
            key={exercise.name}
            className="flex justify-between items-center bg-zinc-700 p-3 rounded-sm flex"
          >
            <div>{exercise.name}</div>
            <div className="font-bold">{Number(exercise.log)}kg</div>
          </div>
        ))}
      </div>
    </div>
  );
}
