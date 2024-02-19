import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

type PfPData = {
  username: string;
  multiplier: number;
}[];

const PoundForPoundResults = ({ data }: { data: PfPData }) => {
  const noWeightLogged = data.filter((u) => u.multiplier === 0);

  if (noWeightLogged.length) {
    const users = noWeightLogged.map((u) => `@${u.username}`);

    return (
      <div className="bg-zinc-700 p-4 mb-8 max-w-[600px] mx-auto">
        <h2 className="text-lg font-bold mb-3">Strength Comparison</h2>
        Both users{" "}
        <span className="font-bold">
          must log a body weight in my account
        </span>{" "}
        to find out strength comparison. The following users have not logged
        their body weight: <span className="font-bold">{users.join(", ")}</span>
      </div>
    );
  }

  const calculateStrenghDiff = data.map((user, index) => {
    const score = user.multiplier * 1000;
    let winner: boolean;

    if (index === 0) {
      const theirMultiplier = data[index + 1].multiplier;
      winner = user.multiplier > theirMultiplier;
    } else {
      const theirMultiplier = data[index - 1].multiplier;
      winner = user.multiplier > theirMultiplier;
    }

    return {
      ...user,
      winner,
      score,
    };
  });

  const scores = calculateStrenghDiff.map((s) => s.score);

  const highScore = Math.max(...scores);
  const lowScore = Math.min(...scores);

  const winner = calculateStrenghDiff.find((user) => user.winner);

  const percentageDifference =
    Math.round((100 - (100 / highScore) * lowScore) * 100) / 100;

  return (
    <>
      <div className="bg-zinc-700 p-4 mb-6 max-w-[600px] mx-auto">
        <h2 className="text-lg font-bold mb-3">Strength Comparison</h2>
        <p>
          The results are in, the numbers crunched, we have determined that the
          winner is <span className="font-bold">{winner?.username}</span>. This
          user is pound for pound stronger by{" "}
          <span className="font-bold">{percentageDifference}</span>%!{" "}
          <Link className="underline" href="/how-is-strength-calculated">
            Click here
          </Link>{" "}
          to find out more about how strength is calculated
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {calculateStrenghDiff.map((user) => (
          <div key={user.username}>
            <div>{user.winner ? "1st" : "2nd"}</div>
            <FontAwesomeIcon
              icon={faTrophy}
              className={`w-[60px] h-[60px] ${user.winner ? "text-amber-400" : "text-zinc-300"}`}
            />
            <div
              className={`font-bold ${user.winner ? "text-green-400" : "text-red-400"}`}
            >
              {user.winner ? "+" : "-"}
              {percentageDifference}%
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PoundForPoundResults;
