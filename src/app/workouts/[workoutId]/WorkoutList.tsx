'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAppDispatch } from '@/lib/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { getUnits } from '@/helpers/units';
import { Button } from '@/components';
import { IWorkout, IWorkoutLoggingType } from '@/types/IWorkout';
import useUserWorkouts from '@/hooks/useUserWorkouts';
import LogWorkout from '@/components/LogWorkout';
import WorkoutListItem from './WorkoutListItem';
import PopUpModal from '@/components/PopUpModal/PopUpModal';
import { removeSuccess } from '@/lib/features/userWorkouts/userWorkoutsSlice';
import { Box } from '@/components/DesignSystemElements';

type SelectedWorkoutType = {
  workout: IWorkout;
  existingPb?: string;
};

export const getPrettyValue = (
  value: string,
  logging_type: IWorkoutLoggingType,
) => {
  if (logging_type === '24.1' || logging_type === '24.3') {
    let oneRepMax;

    const parts = value.split(',');
    oneRepMax = ` ${parts[0]}`;

    if (parts[1] === 'yes') {
      oneRepMax += ` ${parts[3]}`;
    } else {
      oneRepMax += ` ${parts[2]} ${parts[3]}`;
    }

    return oneRepMax;
  }

  if (logging_type === '24.2') {
    let oneRepMax;

    const parts = value.split(',');
    oneRepMax = ` ${parts[0]} ${parts[1]}`;

    return oneRepMax;
  }

  return value;
};

const WorkoutList = ({ workout }: { workout: IWorkout }) => {
  const [selectedWorkout, setSelectedWorkout] =
    useState<SelectedWorkoutType | null>(null);
  const [deleteWorkoutId, setDeleteWorkoutId] = useState<number | null>(null);

  const { data, loading, err, getFastestTime, getWorkoutById, getOneRepMax } =
    useUserWorkouts();
  const dispatch = useAppDispatch();

  const deleteWorkout = async () => {
    await fetch('/api/user/workouts', {
      method: 'DELETE',
      body: JSON.stringify({ id: deleteWorkoutId }),
    });

    dispatch(removeSuccess({ id: deleteWorkoutId as number }));
    setDeleteWorkoutId(null);

    toast.success('Workout Removed');
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
                onClick={() =>
                  setSelectedWorkout({
                    workout,
                    existingPb: getBest() as string,
                  })
                }
                className="mb-4"
              >
                <FontAwesomeIcon icon={faPlus} className="w-4 h-4" /> Log
              </Button>
              <div className="grid grid-cols-2 gap-4 text-center mb-6 md:inline-grid md:w-[400px]">
                {workout.logging_type !== '24.1' &&
                  workout.logging_type !== '24.2' &&
                  workout.logging_type !== '24.3' && (
                    <Box>
                      <p className="text-xl font-bold mb-2">Best</p>
                      {getBest()}
                      {getUnits(workout.logging_type)}
                    </Box>
                  )}
                <Box>
                  <p className="text-xl font-bold mb-2 text-center">Latest</p>
                  {getPrettyValue(
                    getWorkoutById(workout.id)[0].log,
                    workout.logging_type,
                  )}
                  {getUnits(workout.logging_type)}
                </Box>
              </div>
              <p className="text-xl font-bold mb-2 lg:mb-4">Log</p>
              <div className="grid gap-4 lg:gap-6">
                {getWorkoutById(workout.id).map(userWorkout => {
                  return (
                    <WorkoutListItem
                      key={userWorkout.id}
                      workout={workout}
                      userWorkout={userWorkout}
                      deleteWorkout={id => setDeleteWorkoutId(id)}
                    />
                  );
                })}
              </div>
            </>
          ) : (
            <Button
              type="button"
              className="flex gap-3 items-center"
              onClick={() =>
                setSelectedWorkout({
                  workout,
                  existingPb: getBest() as string,
                })
              }
            >
              Log your first {workout.workout_type} {workout.name}
              <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
            </Button>
          )}
        </>
      )}
      {selectedWorkout && (
        <PopUpModal close={() => setSelectedWorkout(null)}>
          <LogWorkout
            currentPb={selectedWorkout.existingPb}
            workout={selectedWorkout.workout}
            close={() => setSelectedWorkout(null)}
          />
        </PopUpModal>
      )}

      {deleteWorkoutId && (
        <PopUpModal close={() => setDeleteWorkoutId(null)}>
          <h2 className="text-xl font-bold mb-4">
            Delete workout {deleteWorkoutId}!
          </h2>
          <p className="mb-3">
            Are you sure you want to delete this workout log?
          </p>
          <div className="grid gap-2 grid-cols-2">
            <Button
              type="button"
              theme="danger"
              onClick={() => deleteWorkout()}
            >
              Yes, Delete
            </Button>
            <Button type="button" onClick={() => setDeleteWorkoutId(null)}>
              No, Cancel
            </Button>
          </div>
        </PopUpModal>
      )}
    </>
  );
};

export default WorkoutList;
