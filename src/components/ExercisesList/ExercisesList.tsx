'use client';

import { useState } from 'react';
import LogExercise from '../LogExercise';
import useUserExercises from '@/hooks/useUserExercises';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { getUnits } from '@/helpers/units';
import { IExercise, IExerciseType } from '@/types/IExercise';
import MovementListItem from '@/components/MovementListItem';
import { filterByName, sortByName } from '@/helpers/arrayHelpers';
import PopUpModal from '@/components/PopUpModal/PopUpModal';

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
  const [exerciseType, setExerciseType] = useState<'' | IExerciseType>('');
  const { loading, err, getOneRepMax, getFastestTime } = useUserExercises();

  if (loading && !err) return <>Loading...</>;
  if (!loading && err) return <>Error</>;

  return (
    <>
      <div className="grid md:grid-cols-2 gap-4 mb-4 lg:gap-6 lg:mb-6">
        <div>
          <p className="mb-1">Search</p>
          <input
            type="text"
            className="text-sm rounded block w-full p-2.5 bg-rand-400 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 h-[40px]"
            placeholder="Search"
            autoComplete="off"
            onChange={e => setSearch(e.target.value)}
            value={search}
          />
        </div>
        <div>
          <p className="mb-1">Category</p>
          <select
            className="text-sm rounded block w-full p-2.5 bg-rand-400 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 h-[40px]"
            onChange={e =>
              setExerciseType(e.target.value as '' | IExerciseType)
            }
            value={exerciseType}
          >
            <option value="">All</option>
            <option value="Cardio">Cardio</option>
            <option value="Lifting">Lifting</option>
            <option value="Olympic Lifting">Olympic Lifting</option>
            <option value="Bodyweight">Bodyweight</option>
            <option value="Calisthenics">Calisthenics</option>
          </select>
        </div>
      </div>
      <div className="grid gap-4 lg:gap-6">
        {exercises
          .sort(sortByName)
          .filter(exercise => {
            if (exerciseType === '') {
              return exercise;
            } else {
              if (
                exercise.exercise_type
                  .toLowerCase()
                  .includes(exerciseType.toLowerCase())
              ) {
                return exercise;
              }
            }
          })
          .filter(exercise => filterByName(exercise, search))
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
              <MovementListItem
                key={exercise.id}
                movementTitle={exercise.name}
                href={`/exercises/${exercise.id}`}
                movementSubTitle={
                  oneRepMax
                    ? `Best: ${oneRepMax} ${getUnits(exercise.logging_type)}`
                    : null
                }
              >
                <div
                  onClick={() =>
                    setSelectedExercise({
                      exercise,
                      existingPb: oneRepMax ? oneRepMax : undefined,
                    })
                  }
                  className="cursor-pointer bg-egwene-500 text-rand-500 w-11 flex items-center justify-center rounded-xl"
                >
                  <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
                </div>
              </MovementListItem>
            );
          })}
      </div>

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

export default ExercisesList;
