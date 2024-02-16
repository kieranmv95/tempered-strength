import { query } from "@/db";
import BackButton from "@/app/components/BackButton";
import { ILoggingType } from "@/app/api/user/exercises/route";
import { getUnits } from "@/app/helpers/units";
import PoweredBy from "@/app/components/PoweredBy";
import CopyUrlToClipboard from "@/app/components/CopyUrlToClipboard";
import UsersNotFound from "@/app/compare/[userOne]/[userTwo]/UsersNotFound";
import NotEnoughDataToCompare from "@/app/compare/[userOne]/[userTwo]/NotEnoughDataToCompare";
import PoundForPoundResults from "@/app/compare/[userOne]/[userTwo]/PoundForPoundResults";

type IUserStats = {
  log: string;
  date: Date;
  name: string;
  logging_type: ILoggingType;
  username: string;
  weight: number;
};

interface ExerciseWithDiff extends IUserStats {
  diff: number;
  bodyweightRatio?: number;
}
interface UserExercises {
  [username: string]: IUserStats[];
}

interface UserDiffExercises {
  [username: string]: ExerciseWithDiff[];
}

const getUserData = async (userOne: string, userTwo: string) => {
  const user = (await query(`
    SELECT ue.log, ue.date, e.name, e.logging_type, u.username, u.weight
    FROM (
        SELECT userId, exerciseId, MAX(log) as MaxLog
        FROM userExercises
        GROUP BY userId, exerciseId
    ) as max_ue
    JOIN userExercises ue ON max_ue.userId = ue.userId AND max_ue.exerciseId = ue.exerciseId AND max_ue.MaxLog = ue.log
    JOIN users u ON ue.userId = u.id
    JOIN exercises e ON ue.exerciseId = e.id
    WHERE u.username = '${userOne}' OR u.username = '${userTwo}';
  `)) as IUserStats[];

  if (!user.length) {
    return Promise.resolve(null);
  } else {
    return Promise.resolve(user);
  }
};

type PfPData = any;

type PageProps = {
  params: {
    userOne: string;
    userTwo: string;
  };
};

export default async function Page({ params }: PageProps) {
  const user = await getUserData(params.userOne, params.userTwo);

  function findCommonExercisesAndCalculateDiff(
    usersData: UserExercises,
  ): UserDiffExercises {
    // Initialize commonExercises with the correct type
    const commonExercises: UserDiffExercises = {};
    const usernames = Object.keys(usersData);

    const [firstUser, secondUser] = usernames.map(
      (username) => usersData[username],
    );

    firstUser.forEach((exercise) => {
      const matchingExercise = secondUser.find((e) => e.name === exercise.name);

      if (matchingExercise) {
        const diff =
          parseFloat(exercise.log) - parseFloat(matchingExercise.log);
        // Make sure the user entries exist before pushing to them
        commonExercises[exercise.username] =
          commonExercises[exercise.username] || [];
        commonExercises[matchingExercise.username] =
          commonExercises[matchingExercise.username] || [];

        commonExercises[exercise.username].push({
          ...exercise,
          diff: +diff.toFixed(2), // TypeScript knows this is a number now
        });
        commonExercises[matchingExercise.username].push({
          ...matchingExercise,
          diff: -diff.toFixed(2), // Same here
        });
      }
    });

    return commonExercises;
  }

  const getPfPChampion = (data: UserDiffExercises) => {
    const test = Object.values(data).map((ewd) => {
      return {
        username: ewd[0].username,
        multiplier: ewd
          .map((exercise) => {
            if (exercise.logging_type === "weight") {
              return {
                multiplier: exercise.weight
                  ? Number(exercise.log) / Number(exercise.weight)
                  : null,
              };
            } else {
              return {
                multiplier: null,
              };
            }
          })
          .reduce((acc, cur) => {
            const curNum = cur.multiplier ? cur.multiplier : 0;
            return acc + curNum;
          }, 0),
      };
    });

    return test;
  };

  if (!user) return <UsersNotFound />;

  const groupedByUser = user.reduce(
    (acc, currentItem) => {
      if (!acc[currentItem.username]) {
        acc[currentItem.username] = [];
      }
      acc[currentItem.username].push(currentItem);

      return acc;
    },
    {} as { [key: string]: IUserStats[] },
  );

  const result = Object.values(groupedByUser);

  if (result.length < 2) return <NotEnoughDataToCompare />;

  const comparisonData = findCommonExercisesAndCalculateDiff(groupedByUser);
  // const blob = getPfPChampion(comparisonData);

  const poundforPoundData = getPfPChampion(comparisonData);

  return (
    <>
      <div className="mt-3 ml-4">
        <BackButton href="/">Back to home</BackButton>
      </div>
      <div className="text-center px-4 w-full max-w-[960px] mx-auto">
        <h1 className="text-2xl font-bold mt-12 mb-4">Comparison</h1>
        <CopyUrlToClipboard>Copy Comparison URL</CopyUrlToClipboard>
        <PoundForPoundResults data={poundforPoundData} />
        <div className="grid grid-cols-2 gap-4 mt-4">
          {Object.values(comparisonData).map((item) => (
            <div key={item[0].username}>
              <h2 className="text-xl">@{item[0].username}</h2>
              <div className="grid gap-3 mt-3">
                {item.map((exercise) => {
                  const { name, log, diff } = exercise;
                  return (
                    <div
                      key={name}
                      className="grid md:flex md:justify-between items-center bg-zinc-700 p-3 rounded-sm"
                    >
                      <div>{name}</div>
                      <div className="md:flex md:gap-3">
                        <div
                          className={`
                          font-bold
                          ${diff < 0 && "text-red-400"}
                          ${diff > 0 && "text-green-400"}
                        `}
                        >
                          {diff > 0 && "+"}
                          {Number(diff)}
                          {getUnits(exercise.logging_type)}
                        </div>
                        <div className="font-bold">
                          {Number(log)}
                          {getUnits(exercise.logging_type)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <PoweredBy />
      </div>
    </>
  );
}
