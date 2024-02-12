import { query } from "@/db";
import BackButton from "@/app/components/BackButton";
import { ILoggingType } from "@/app/api/user/exercises/route";
import { getUnits } from "@/app/helpers/units";
import PoweredBy from "@/app/components/PoweredBy";
import CopyUrlToClipboard from "@/app/components/CopyUrlToClipboard";

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
          <BackButton href="/bests">Back to search</BackButton>
        </div>
        <h1 className="text-2xl md:text-4xl font-bold">
          user not found or user has not logged any lifts yet!
        </h1>
      </div>
    );
  }

  const powerLiftingMoves = user.filter((exercise) => {
    switch (exercise.name.toLowerCase()) {
      case "deadlift":
      case "bench press":
      case "back squat":
        return exercise;
      default:
        return null;
    }
  });

  const olympicLiftingMoves = user.filter((exercise) => {
    switch (exercise.name.toLowerCase()) {
      case "clean & jerk":
      case "snatch":
        return exercise;
      default:
        return null;
    }
  });

  let powerLiftingTotal = powerLiftingMoves.reduce((prev, curr) => {
    return prev + Number(curr.log);
  }, 0);

  let olympicLiftingTotal = olympicLiftingMoves.reduce((prev, curr) => {
    return prev + Number(curr.log);
  }, 0);

  return (
    <>
      <div className="mt-3 ml-4">
        <BackButton href="/">Back to home</BackButton>
      </div>
      <div className="text-center px-4 w-full max-w-[600px] mx-auto">
        <h1 className="text-2xl md:text-4xl font-bold mt-120">
          @{params.username}
        </h1>
        <CopyUrlToClipboard>Copy profile url</CopyUrlToClipboard>
        {powerLiftingMoves.length === 3 && (
          <>
            <p className="text-lg font-bold mt-6">
              Powerlifting total {powerLiftingTotal}kg
            </p>
            <div className="grid grid-cols-3 mt-4 gap-4">
              {powerLiftingMoves.map((plMove) => (
                <div className="grid bg-zinc-700 py-4" key={plMove.name}>
                  <div className="text-sm mb-2">{plMove.name}</div>
                  <div className="font-bold">{Number(plMove.log)}kg</div>
                </div>
              ))}
            </div>
          </>
        )}
        {olympicLiftingMoves.length === 2 && (
          <>
            <p className="text-lg font-bold mt-6">
              Olympic lifting total {olympicLiftingTotal}kg
            </p>
            <div className="grid grid-cols-2 mt-4 gap-4">
              {olympicLiftingMoves.map((plMove) => (
                <div className="grid bg-zinc-700 py-4" key={plMove.name}>
                  <div className="text-sm mb-2">{plMove.name}</div>
                  <div className="font-bold">{Number(plMove.log)}kg</div>
                </div>
              ))}
            </div>
          </>
        )}
        <div className="grid gap-3 mt-6">
          {user.map((exercise) => (
            <div
              key={exercise.name}
              className="flex justify-between items-center bg-zinc-700 p-3 rounded-sm"
            >
              <div>{exercise.name}</div>
              <div className="font-bold">
                {Number(exercise.log)}
                {getUnits(exercise.logging_type)}
              </div>
            </div>
          ))}
        </div>
        <PoweredBy />
      </div>
    </>
  );
}
