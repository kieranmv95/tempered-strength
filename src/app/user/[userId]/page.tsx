import { query } from "@/db";

type DataMap = {
  [key: string]: number;
};

const getUser = async (id: string) => {
  const data = (await query(`
        SELECT exercises.name, userExercises.log
        FROM exercises
        INNER JOIN userExercises ON exercises.id=userExercises.exerciseId WHERE userExercises.userId='${id}'
    `)) as { name: string; log: string; logging_type: string }[];

  const sanitised = data.reduce((acc, cur) => {
    let largerNumber;

    if (!acc[cur.name]) {
      largerNumber = Number(cur.log);
    } else {
      largerNumber =
        acc[cur.name] > Number(cur.log) ? acc[cur.name] : Number(cur.log);
    }

    return {
      ...acc,
      [cur.name]: largerNumber,
    };
  }, {} as DataMap);

  return { sanitised };
};

export default async function Page({ params }: { params: { userId: string } }) {
  const { sanitised } = await getUser(params.userId);

  return (
    <div className="w-full max-w-[800px] px-4 mx-auto pt-12">
      <p className="mb-4 text-xl font-bold">One Rep maxes</p>
      <div className="grid gap-3">
        {Object.keys(sanitised).map((keyName, _) => (
          <div
            key={keyName}
            className="bg-zinc-700 px-3 rounded-sm flex justify-between h-11 items-center"
          >
            <div>{keyName}</div>
            <div className="font-bold">{sanitised[keyName]}kg</div>
          </div>
        ))}
      </div>
    </div>
  );
}
