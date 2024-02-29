'use client';

import React, { useState } from 'react';
import { removeSuccess } from '@/lib/features/userExercises/userExercisesSlice';
import toast from 'react-hot-toast';
import { useAppDispatch } from '@/lib/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { getUnits } from '@/helpers/units';
import { Button } from '@/components';
import { IWorkout } from '@/types/IWorkout';
import useUserWorkouts from '@/hooks/useUserWorkouts';
import LogWorkoutModal from '@/components/LogWorkoutModal';
import WorkoutListItem from './WorkoutListItem';

const WorkoutList = ({ workout }: { workout: IWorkout }) => {
  const [selectedWorkout, setSelectedWorkout] = useState<IWorkout | null>(null);

  const { data, loading, err, getFastestTime, getWorkoutById, getOneRepMax } =
    useUserWorkouts();
  const dispatch = useAppDispatch();

  const deleteWorkout = async (id: number) => {
    await fetch('/api/user/workouts', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });

    dispatch(removeSuccess({ id }));

    toast.success('Exercise Removed');
  };

  const getBest = () => {
    if (workout.logging_type === 'weight' || workout.logging_type === 'reps') {
      return getOneRepMax(workout.id);
    }
    if (workout.logging_type === 'duration') {
      return getFastestTime(workout.id);
    }
  };

  return (
    <>
      {loading && !err && <>Loading...</>}
      {!loading && err && <>Error</>}
      {!loading && !err && data && (
        <>
          {getWorkoutById(workout.id).length ? (
            <>
              <Button
                type="button"
                onClick={() => setSelectedWorkout(workout)}
                className="mb-4"
              >
                <FontAwesomeIcon icon={faPlus} className="w-4 h-4" /> Log
              </Button>
              <div className="grid grid-cols-2 gap-4 text-center mb-6 md:inline-grid md:w-[400px]">
                <div className="bg-zinc-700 rounded-sm py-6">
                  <p className="text-xl font-bold mb-2">Best</p>
                  {getBest()}
                  {getUnits(workout.logging_type)}
                </div>
                <div className="bg-zinc-700 rounded-sm py-6">
                  <p className="text-xl font-bold mb-2 text-center">Latest</p>
                  {getWorkoutById(workout.id)[0].log}
                  {getUnits(workout.logging_type)}
                </div>
              </div>
              <p className="text-xl font-bold mb-2">Log</p>
              <div className="grid gap-3">
                {getWorkoutById(workout.id).map(userWorkout => {
                  return (
                    <WorkoutListItem
                      key={userWorkout.id}
                      workout={workout}
                      userWorkout={userWorkout}
                      deleteWorkout={id => deleteWorkout(id)}
                    />
                  );
                })}
              </div>
            </>
          ) : (
            <div>
              <button
                className="block bg-green-600 hover:bg-green-700 py-2 px-4 rounded mt-2"
                onClick={() => setSelectedWorkout(workout)}
              >
                Log your first {workout.workout_type} {workout.name}{' '}
                <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      )}
      {selectedWorkout && (
        <LogWorkoutModal
          workout={selectedWorkout}
          close={() => setSelectedWorkout(null)}
        />
      )}
    </>
  );
};

export default WorkoutList;