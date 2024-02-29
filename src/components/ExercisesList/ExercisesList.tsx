'use client';

import { useState } from 'react';
import LogExerciseForm from '../LogExerciseModal';
import useUserExercises from '@/hooks/useUserExercises';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { getUnits } from '@/helpers/units';
import { IExercise } from '@/types/IExercise';

type ExercisesListProps = {
  exercises: IExercise[];
};

type SelectedExerciseType = {
  exercise: IExercise;
  existingPb?: string | number;
};

const ExercisesList = ({ exercises }: ExercisesListProps) => {
  const [selectedExercise, setSelectedExercise] =
    useState<SelectedExerciseType | null>(null);
  const [search, setSearch] = useState('');
  const { loading, err, getOneRepMax, getFastestTime } = useUserExercises();

  if (loading && !err) return <>Loading...</>;
  if (!loading && err) return <>Error</>;

  return (
    <>
      <p className="mb-1">Search</p>
      <input
        type="text"
        className="text-sm rounded block w-full p-2.5 bg-zinc-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 mb-4 h-[44px]"
        placeholder="Search"
        autoComplete="off"
        onChange={e => setSearch(e.target.value)}
        value={search}
      />
      <div className="grid gap-3">
        {exercises
          .sort((a, b) => {
            return a.name.localeCompare(b.name);
          })
          .filter(exercise => {
            if (search === '') {
              return exercise;
            } else {
              if (exercise.name.toLowerCase().includes(search.toLowerCase())) {
                return exercise;
              }
            }
          })
          .map(exercise => {
            let oneRepMax: number | string | null;

            if (
              exercise.logging_type === 'weight' ||
              exercise.logging_type === 'reps'
            ) {
              oneRepMax = getOneRepMax(exercise.id);
            } else {
              //duration
              oneRepMax = getFastestTime(exercise.id);
            }

            return (
              <div
                key={exercise.id}
                className="grid grid-cols-[1fr_auto] justify-between items-center gap-2"
              >
                <div className="bg-zinc-700 p-3 rounded-sm">
                  <p>{exercise.name}</p>
                  {oneRepMax && (
                    <p className="font-bold text-sm">
                      Best: {oneRepMax}
                      {getUnits(exercise.logging_type)}
                    </p>
                  )}
                </div>
                <div className="flex gap-2 h-full">
                  <div
                    onClick={() =>
                      setSelectedExercise({
                        exercise,
                        existingPb: oneRepMax ? oneRepMax : undefined,
                      })
                    }
                    className="cursor-pointer bg-green-600 hover:bg-green-700 text-white rounded-sm w-11 flex items-center justify-center"
                  >
                    <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
                  </div>
                  <Link
                    href={`/exercises/${exercise.id}`}
                    className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded-sm w-11 flex items-center justify-center"
                  >
                    <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
      </div>

      {selectedExercise && (
        <LogExerciseForm
          currentPb={selectedExercise.existingPb}
          exercise={selectedExercise.exercise}
          close={() => setSelectedExercise(null)}
        />
      )}
    </>
  );
};

export default ExercisesList;
