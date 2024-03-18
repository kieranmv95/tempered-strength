import CopyUrlToClipboard from '@/components/CopyUrlToClipboard';
import { getUnits } from '@/helpers/units';
import PoweredBy from '@/components/PoweredBy';
import { ILoggingType } from '@/types/IExercise';
import Back from '@/app/user/[username]/Back';

type UserPublicProfileProps = {
  username: string;
  copyToClipboard?: boolean;
  authedBack?: boolean;
  user: {
    log: string;
    date: Date;
    name: string;
    logging_type: ILoggingType;
  }[];
};

const UserPublicProfile = ({
  authedBack = false,
  username,
  user,
  copyToClipboard = true,
}: UserPublicProfileProps) => {
  const powerLiftingMoves = user.filter(exercise => {
    switch (exercise.name.toLowerCase()) {
      case 'deadlift':
      case 'bench press':
      case 'back squat':
        return exercise;
      default:
        return null;
    }
  });

  const olympicLiftingMoves = user.filter(exercise => {
    switch (exercise.name.toLowerCase()) {
      case 'clean & jerk':
      case 'snatch':
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
    <div className="text-center px-4 w-full max-w-[600px] mx-auto mt-12">
      {authedBack && <Back />}
      <h1 className="text-2xl md:text-4xl font-bold mt-120">{username}</h1>

      {copyToClipboard && (
        <div className="flex justify-center mt-4">
          <CopyUrlToClipboard>Copy profile URL</CopyUrlToClipboard>
        </div>
      )}
      {powerLiftingMoves.length === 3 && (
        <>
          <p className="text-lg font-bold mt-6">
            Powerlifting total {powerLiftingTotal}kg
          </p>
          <div className="grid grid-cols-3 mt-4 gap-4">
            {powerLiftingMoves.map(plMove => (
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
            {olympicLiftingMoves.map(plMove => (
              <div className="grid bg-zinc-700 py-4" key={plMove.name}>
                <div className="text-sm mb-2">{plMove.name}</div>
                <div className="font-bold">{Number(plMove.log)}kg</div>
              </div>
            ))}
          </div>
        </>
      )}
      <div className="grid gap-3 mt-6">
        {user.map(exercise => (
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
  );
};

export default UserPublicProfile;
