'use client';

import React, { useState } from 'react';
import useUserExercises from '@/hooks/useUserExercises';
import ExerciseListItem from '@/app/exercises/[exerciseId]/ExerciseListItem';
import { removeSuccess } from '@/lib/features/userExercises/userExercisesSlice';
import toast from 'react-hot-toast';
import { useAppDispatch } from '@/lib/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { getUnits } from '@/helpers/units';
import { PercentagesBreakdown, LogExercise, Button } from '@/components';
import { IExercise } from '@/types/IExercise';
import PopUpModal from '@/components/PopUpModal/PopUpModal';

type SelectedExerciseType = {
  exercise: IExercise;
  existingPb?: string | number;
};

const ExerciseList = ({ exercise }: { exercise: IExercise }) => {
  const [selectedExercise, setSelectedExercise] =
    useState<SelectedExerciseType | null>(null);
  const [breakdownPb, setBreakdownPb] = useState(true);

  const { data, loading, err, getFastestTime, getExerciseById, getOneRepMax } =
    useUserExercises();
  const dispatch = useAppDispatch();

  const deleteExercise = async (id: number) => {
    await fetch('/api/user/exercises', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });

    dispatch(removeSuccess({ id }));

    toast.success('Exercise Removed');
  };

  const getBest = () => {
    if (
      exercise.logging_type === 'weight' ||
      exercise.logging_type === 'reps'
    ) {
      return getOneRepMax(exercise.id);
    } else {
      // duration
      return getFastestTime(exercise.id);
    }
  };

  const getLatest = () => {
    if (
      exercise.logging_type === 'weight' ||
      exercise.logging_type === 'reps'
    ) {
      return getExerciseById(exercise.id)[0].log;
    }
    if (exercise.logging_type === 'duration') {
      return getExerciseById(exercise.id)[0].duration;
    }
  };

  return (
    <>
      {loading && !err && <>Loading...</>}
      {!loading && err && <>Error</>}
      {!loading && !err && data && (
        <>
          {getExerciseById(exercise.id).length ? (
            <>
              <Button
                type="button"
                onClick={() =>
                  setSelectedExercise({
                    exercise,
                    existingPb: getBest() || undefined,
                  })
                }
                className="mb-4"
              >
                <FontAwesomeIcon icon={faPlus} className="w-4 h-4" /> Log
              </Button>
              <div className="grid grid-cols-2 gap-4 text-center mb-6 md:inline-grid md:w-[400px]">
                <div className="bg-zinc-700 rounded-sm py-6">
                  <p className="text-xl font-bold mb-2">Best</p>
                  {getBest()}
                  {getUnits(exercise.logging_type)}
                </div>
                <div className="bg-zinc-700 rounded-sm py-6">
                  <p className="text-xl font-bold mb-2 text-center">Latest</p>
                  {getLatest()}
                  {getUnits(exercise.logging_type)}
                </div>
              </div>
              {(exercise.logging_type === 'weight' ||
                exercise.logging_type === 'reps') && (
                <>
                  <p className="text-xl font-bold mb-2">
                    Percentages Breakdown
                  </p>
                  <div className="flex gap-3 mb-2">
                    <button
                      className={`block py-2 px-4 rounded ${breakdownPb ? 'bg-blue-600 hover:bg-blue-600' : 'bg-blue-400 hover:bg-blue-500'}`}
                      onClick={() => setBreakdownPb(true)}
                    >
                      Best
                    </button>
                    <button
                      className={`block py-2 px-4 rounded ${!breakdownPb ? 'bg-blue-600 hover:bg-blue-600' : 'bg-blue-400 hover:bg-blue-500'}`}
                      onClick={() => setBreakdownPb(false)}
                    >
                      Latest
                    </button>
                  </div>
                  <div className="mb-6">
                    <PercentagesBreakdown
                      value={
                        breakdownPb
                          ? getExerciseById(exercise.id).reduce((a, b) => {
                              return Math.max(a, b.log as number);
                            }, -Infinity)
                          : (getExerciseById(exercise.id)[0].log as number)
                      }
                      loggingType={exercise.logging_type}
                    />
                  </div>
                </>
              )}
              <p className="text-xl font-bold mb-2">Log</p>
              <div className="grid gap-3">
                {getExerciseById(exercise.id).map(userExercise => {
                  return (
                    <ExerciseListItem
                      key={userExercise.id}
                      exercise={exercise}
                      userExercise={userExercise}
                      deleteExercise={id => deleteExercise(id)}
                    />
                  );
                })}
              </div>
            </>
          ) : (
            <div>
              <button
                className="block bg-green-600 hover:bg-green-700 py-2 px-4 rounded mt-2"
                onClick={() => setSelectedExercise({ exercise })}
              >
                Log your first {exercise.name}{' '}
                <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      )}
      {selectedExercise && (
        <PopUpModal close={() => setSelectedExercise(null)}>
          <LogExercise
            currentPb={selectedExercise.existingPb}
            exercise={selectedExercise.exercise}
            close={() => setSelectedExercise(null)}
          />
        </PopUpModal>
      )}
    </>
  );
};

export default ExerciseList;
