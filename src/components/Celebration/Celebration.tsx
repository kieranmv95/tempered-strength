'use client';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Button } from '@/components';
import { clearCelebration } from '@/lib/features/celebration/celebrationSlice';
import { formatScore, getUnits } from '@/helpers/units';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { ILoggingType } from '@/types/IExercise';
import { IWorkoutLoggingType } from '@/types/IWorkout';
import { useEffect } from 'react';

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

  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        dispatch(clearCelebration());
      }
    };

    document.addEventListener('keyup', handleKeyUp);

    return () => document.removeEventListener('keyup', handleKeyUp);
  }, []);

  if (!data) return null;

  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full z-[100] flex items-center justify-center cursor-pointer"
        onClick={() => dispatch(clearCelebration())}
      >
        <div
          className="w-full h-full md:max-w-[400px] relative bg-gradient-to-r from-violet-600 to-fuchsia-600 p-8 text-center md:h-auto grid items-center cursor-auto"
          onClick={e => e.stopPropagation()}
        >
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

            <div className="mb-4">
              You logged a new{' '}
              <span className="font-bold">{data.exercise}</span>
              {pbData?.pb ? 'PB!' : ''}
            </div>

            <div
              className="text-3xl font-bold"
              dangerouslySetInnerHTML={{
                __html: formatScore(data.loggingType, data.score),
              }}
            />
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
