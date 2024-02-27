'use client';

import { useState } from 'react';
import useUserExercises from '@/hooks/useUserExercises';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { IWorkout } from '@/types/IWorkout';
import LogWorkoutForm from '@/components/LogWorkoutModal';
import useUserWorkouts from '@/hooks/useUserWorkouts';
import { getUnits } from '@/helpers/units';

type WorkoutsListProps = {
  workouts: IWorkout[];
};

const WorkoutsList = ({ workouts }: WorkoutsListProps) => {
  const [selectedWorkout, setSelectedWorkout] = useState<IWorkout | null>(null);
  const [search, setSearch] = useState('');
  const { loading, err, getOneRepMax, getFastestTime } = useUserWorkouts();

  if (loading && !err) return <>Loading...</>;
  if (!loading && err) return <>Error</>;

  return (
    <>
      <p className="mb-1">Search</p>
      <input
        type="text"
        className="text-sm rounded block w-full p-2.5 bg-zinc-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 mb-4"
        placeholder="Search"
        autoComplete="off"
        onChange={e => setSearch(e.target.value)}
        value={search}
      />
      <div className="grid gap-3">
        {workouts
          .sort((a, b) => {
            return a.name.localeCompare(b.name);
          })
          .filter(workout => {
            if (search === '') {
              return workout;
            } else {
              if (
                `${workout.workout_type} - ${workout.name}`
                  .toLowerCase()
                  .includes(search.toLowerCase())
              ) {
                return workout;
              }
            }
          })
          .map(workout => {
            let oneRepMax;

            if (
              workout.logging_type === 'weight' ||
              workout.logging_type === 'reps'
            ) {
              oneRepMax = getOneRepMax(workout.id);
            }

            if (workout.logging_type === 'duration') {
              oneRepMax = getFastestTime(workout.id);
            }
            return (
              <div
                key={workout.id}
                className="grid grid-cols-[1fr_auto] justify-between items-center gap-2"
              >
                <div className="bg-zinc-700 p-3 rounded-sm">
                  <p>
                    {workout.workout_type} - {workout.name}
                  </p>
                  {oneRepMax && (
                    <p className="font-bold text-sm">
                      Best: {oneRepMax}
                      {getUnits(workout.logging_type)}
                    </p>
                  )}
                </div>
                <div className="flex gap-2 h-full">
                  <div
                    onClick={() => setSelectedWorkout(workout)}
                    className="cursor-pointer bg-green-600 hover:bg-green-700 text-white rounded-sm w-11 flex items-center justify-center"
                  >
                    <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
                  </div>
                  <Link
                    href={`/workouts/${workout.id}`}
                    className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded-sm w-11 flex items-center justify-center"
                  >
                    <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
      </div>

      {selectedWorkout && (
        <LogWorkoutForm
          workout={selectedWorkout}
          close={() => setSelectedWorkout(null)}
        />
      )}
    </>
  );
};

export default WorkoutsList;
