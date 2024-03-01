'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { IWorkout, IWorkoutType } from '@/types/IWorkout';
import LogWorkoutForm from '@/components/LogWorkoutModal';
import useUserWorkouts from '@/hooks/useUserWorkouts';
import { getUnits } from '@/helpers/units';
import MovementListItem from '@/components/MovementListItem';
import { sortByName } from '@/helpers/arrayHelpers';

type WorkoutsListProps = {
  workouts: IWorkout[];
};

type SelectedWorkoutType = {
  workout: IWorkout;
  existingPb?: string;
};

const WorkoutsList = ({ workouts }: WorkoutsListProps) => {
  const [selectedWorkout, setSelectedWorkout] =
    useState<SelectedWorkoutType | null>(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<'' | IWorkoutType>('');
  const { loading, err, getOneRepMax, getFastestTime, getWorkoutById } =
    useUserWorkouts();

  if (loading && !err) return <>Loading...</>;
  if (!loading && err) return <>Error</>;

  return (
    <>
      <div className="md:grid md:grid-cols-2 gap-4">
        <div>
          <p className="mb-1">Search</p>
          <input
            type="text"
            className="text-sm rounded block w-full p-2.5 bg-zinc-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 mb-4"
            placeholder="Search"
            autoComplete="off"
            onChange={e => setSearch(e.target.value)}
            value={search}
          />
        </div>
        <div>
          <p className="mb-1">Category</p>
          <select
            className="text-sm rounded block w-full p-2.5 bg-zinc-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 mb-4 h-[40px]"
            onChange={e => setCategory(e.target.value as '' | IWorkoutType)}
            value={category}
          >
            <option value="">All</option>
            <option value="CrossFit">CrossFit</option>
            <option value="Hyrox">Hyrox</option>
          </select>
        </div>
      </div>
      <div className="grid gap-3">
        {workouts
          .sort(sortByName)
          .filter(workout => {
            if (category === '') {
              return workout;
            } else {
              if (
                workout.workout_type
                  .toLowerCase()
                  .includes(category.toLowerCase())
              ) {
                return workout;
              }
            }
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
            let oneRepMax: string | null | number;

            if (
              workout.logging_type === 'weight' ||
              workout.logging_type === 'reps'
            ) {
              oneRepMax = getOneRepMax(workout.id);
            } else if (workout.logging_type === 'duration') {
              oneRepMax = getFastestTime(workout.id);
            } else {
              const data = getWorkoutById(workout.id);
              if (data.length) {
                const parts = data[0].log.split(',');
                oneRepMax = ` ${parts[0]}`;

                if (parts[1] === 'yes') {
                  oneRepMax += ` ${parts[3]}`;
                } else {
                  oneRepMax += ` ${parts[2]} ${parts[3]}`;
                }
              } else {
                oneRepMax = null;
              }
            }
            return (
              <MovementListItem
                key={workout.id}
                movementTitle={`${workout.workout_type} - ${workout.name}`}
                movementSubTitle={
                  oneRepMax
                    ? `${workout.logging_type === 'tiebreak_time_or_reps' ? 'Latest:' : 'Best:'} ${oneRepMax} ${getUnits(workout.logging_type)}`
                    : null
                }
              >
                <div
                  onClick={() =>
                    setSelectedWorkout({
                      workout,
                      existingPb: oneRepMax as string,
                    })
                  }
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
              </MovementListItem>
            );
          })}
      </div>

      {selectedWorkout && (
        <LogWorkoutForm
          currentPb={selectedWorkout.existingPb}
          workout={selectedWorkout.workout}
          close={() => setSelectedWorkout(null)}
        />
      )}
    </>
  );
};

export default WorkoutsList;
