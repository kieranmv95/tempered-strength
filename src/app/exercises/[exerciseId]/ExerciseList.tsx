'use client';

import React, { useState } from 'react';
import useUserExercises from '@/hooks/useUserExercises';
import ExerciseListItem from '@/app/exercises/[exerciseId]/ExerciseListItem';
import { deleteUserExercise } from '@/lib/features/userExercises/userExercisesSlice';
import toast from 'react-hot-toast';
import { useAppDispatch } from '@/lib/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { getUnits } from '@/helpers/units';
import { PercentagesBreakdown, LogExercise, Button } from '@/components';
import { IExercise } from '@/types/IExercise';
import PopUpModal from '@/components/PopUpModal/PopUpModal';
import Chart from '@/components/Chart';
import { Box } from '@/components/DesignSystemElements';

type SelectedExerciseType = {
  exercise: IExercise;
  existingPb?: string | number;
};

const ExerciseList = ({ exercise }: { exercise: IExercise }) => {
  const [selectedExercise, setSelectedExercise] =
    useState<SelectedExerciseType | null>(null);
  const [breakdownPb, setBreakdownPb] = useState(true);
  const [exerciseToDelete, setExerciseToDelete] = useState<null | number>(null);

  const { data, loading, err, getFastestTime, getExerciseById, getOneRepMax } =
    useUserExercises();
  const dispatch = useAppDispatch();

  const userExerciseList = getExerciseById(exercise.id);

  const deleteExercise = async (id: number) => {
    await dispatch(deleteUserExercise(id)).unwrap();
    setExerciseToDelete(null);
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
      return userExerciseList[0].log;
    }
    if (exercise.logging_type === 'duration') {
      return userExerciseList[0].duration;
    }
  };

  return (
    <>
      {loading && !err && <>Loading...</>}
      {!loading && err && <>Error</>}
      {!loading && !err && data && (
        <>
          {userExerciseList.length ? (
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
                <Box>
                  <p className="text-xl font-bold mb-2">Best</p>
                  {getBest()}
                  {getUnits(exercise.logging_type)}
                </Box>
                <Box>
                  <p className="text-xl font-bold mb-2 text-center">Latest</p>
                  {getLatest()}
                  {getUnits(exercise.logging_type)}
                </Box>
              </div>
              {(exercise.logging_type === 'weight' ||
                exercise.logging_type === 'reps') && (
                <div className="mb-6">
                  <p className="text-xl font-bold mb-2">Progress</p>
                  <p className="mb-2">showing latest 7 results</p>
                  <Chart
                    data={userExerciseList
                      .map(data => {
                        return {
                          log: data.log as number,
                          date: new Date(data.date).toLocaleDateString(
                            'en-GB',
                            {
                              year: 'numeric',
                              month: 'numeric',
                              day: 'numeric',
                            },
                          ),
                        };
                      })
                      .slice(0, 7)
                      .reverse()}
                  />
                </div>
              )}
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
                          ? userExerciseList.reduce((a, b) => {
                              return Math.max(a, b.log as number);
                            }, -Infinity)
                          : (userExerciseList[0].log as number)
                      }
                      loggingType={exercise.logging_type}
                    />
                  </div>
                </>
              )}
              <p className="text-xl font-bold mb-2 lg:mb-4">Log</p>
              <div className="grid gap-4 lg:gap-6">
                {userExerciseList.map(userExercise => {
                  return (
                    <ExerciseListItem
                      key={userExercise.id}
                      exercise={exercise}
                      userExercise={userExercise}
                      deleteExercise={id => setExerciseToDelete(id)}
                    />
                  );
                })}
              </div>
            </>
          ) : (
            <Button
              type="button"
              className="flex gap-3 items-center"
              onClick={() => setSelectedExercise({ exercise })}
            >
              Log your first {exercise.name}
              <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
            </Button>
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
      {exerciseToDelete && (
        <PopUpModal close={() => setExerciseToDelete(null)}>
          <h2 className="text-xl font-bold mb-4">Delete exercise!</h2>
          <p className="mb-3">
            Are you sure you want to delete this exercise log?
          </p>
          <div className="grid gap-2 grid-cols-2">
            <Button
              type="button"
              theme="danger"
              onClick={() => deleteExercise(exerciseToDelete)}
            >
              Yes, Delete
            </Button>
            <Button type="button" onClick={() => setExerciseToDelete(null)}>
              No, Cancel
            </Button>
          </div>
        </PopUpModal>
      )}
    </>
  );
};

export default ExerciseList;
