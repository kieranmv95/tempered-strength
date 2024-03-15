'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsis,
  faTrash,
  faShare,
} from '@fortawesome/free-solid-svg-icons';
import { getUnits } from '@/helpers/units';
import { IExercise, IUserExercise } from '@/types/IExercise';
import { celebrate } from '@/lib/features/celebration/celebrationSlice';
import { useAppDispatch } from '@/lib/hooks';
import MovementListItem from '@/components/MovementListItem';

type ExerciseListItemProps = {
  exercise: IExercise;
  userExercise: IUserExercise;
  deleteExercise: (id: number) => void;
};

const ExerciseListItem = ({
  exercise,
  userExercise,
  deleteExercise,
}: ExerciseListItemProps) => {
  const dispatch = useAppDispatch();
  const [showOptions, setShowOptions] = useState(false);

  const getFigure = () => {
    if (
      exercise.logging_type === 'weight' ||
      exercise.logging_type === 'reps'
    ) {
      return userExercise.log;
    }
    if (exercise.logging_type === 'duration') {
      return userExercise.duration;
    }
  };

  const score = getFigure();

  return (
    <>
      <MovementListItem
        key={exercise.id}
        movementTitle={new Date(userExercise.date).toLocaleDateString('en-GB')}
        movementSubTitle={`${score}${getUnits(exercise.logging_type)}`}
      >
        <div
          onClick={() => setShowOptions(!showOptions)}
          className="cursor-pointer bg-egwene-500 text-rand-500 w-11 flex items-center justify-center rounded-xl"
        >
          <FontAwesomeIcon icon={faEllipsis} className="w-4 h-4" />
        </div>
        {showOptions && (
          <div className="flex gap-3">
            <div
              onClick={() => {
                dispatch(
                  celebrate({
                    exercise: exercise.name,
                    loggingType: exercise.logging_type,
                    score: score as string,
                  }),
                );
              }}
              className="cursor-pointer bg-blue-600 text-white rounded-xl w-11 flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faShare} className="w-4 h-4" />
            </div>
            <div
              onClick={() => deleteExercise(userExercise.id)}
              className="cursor-pointer bg-danger-500 text-white rounded-xl w-11 flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
            </div>
          </div>
        )}
      </MovementListItem>
    </>
  );
};

export default ExerciseListItem;
