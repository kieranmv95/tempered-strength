'use client';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Button } from '@/components';
import { clearCelebration } from '@/lib/features/celebration/celebrationSlice';
import { getUnits } from '@/helpers/units';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { ILoggingType } from '@/types/IExercise';
import { IWorkoutLoggingType } from '@/types/IWorkout';

const getPbSymbol = (logging_type: ILoggingType | IWorkoutLoggingType) => {
  switch (logging_type) {
    case 'duration':
      return '-';
    default:
      return '+';
  }
};

const Celebration = () => {
  const { data, pbData } = useAppSelector(state => state.celebration);
  const dispatch = useAppDispatch();

  if (!data) return null;

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full z-[100] flex items-center justify-center">
        <div className="w-full h-full md:max-w-[400px] relative bg-gradient-to-r from-violet-600 to-fuchsia-600 p-8 text-center md:h-auto grid items-center">
          <div>
            <img
              src="/TemperedStrength.svg"
              alt="Primary Logo"
              width={400}
              height={188}
              className="w-28 mx-auto mb-6"
            />
            <FontAwesomeIcon
              icon={faTrophy}
              className="w-36 h-36 text-yellow-400"
            />
            {pbData?.pb ? (
              <div className="text-2xl mb-4">New Personal Best!</div>
            ) : (
              <div className="text-2xl mb-4">Congratulations</div>
            )}

            {pbData?.pb ? (
              <div className="mb-4">
                You logged a new{' '}
                <span className="font-bold">{data.exercise}</span> PB!
              </div>
            ) : (
              <div className="mb-4">
                You logged a new{' '}
                <span className="font-bold">{data.exercise}</span>!
              </div>
            )}
            <div className="text-4xl font-bold">
              {data.score}
              {getUnits(data.loggingType)}
            </div>
            {pbData?.diff && (
              <div className="text-xl font-bold mt-4">
                {getPbSymbol(data.loggingType)}
                {pbData.diff}
                {getUnits(data.loggingType)}
              </div>
            )}
            <Button
              type="button"
              theme="text-underline"
              onClick={() => dispatch(clearCelebration())}
              className="w-full"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
      <div className="fixed top-0 left-0 bg-black opacity-80 w-full h-full z-[99]" />
    </>
  );
};

export default Celebration;
