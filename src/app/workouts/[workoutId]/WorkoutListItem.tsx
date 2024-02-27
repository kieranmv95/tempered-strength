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
import { IUserWorkout, IWorkout } from '@/types/IWorkout';

type WorkoutListItemProps = {
  workout: IWorkout;
  userWorkout: IUserWorkout;
  deleteWorkout: (id: number) => void;
};

const WorkoutListItem = ({
  workout,
  userWorkout,
  deleteWorkout,
}: WorkoutListItemProps) => {
  const dispatch = useAppDispatch();
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="grid grid-cols-[1fr_auto] justify-between items-center gap-2">
      <div className="bg-zinc-700 px-3 rounded-sm flex justify-between h-11 items-center">
        <p>{new Date(userWorkout.date).toLocaleDateString('en-GB')}</p>
        <p className="font-bold">
          {userWorkout.log}
          {getUnits(workout.logging_type)}
        </p>
      </div>
      <div className="flex gap-2">
        <div
          onClick={() => setShowOptions(!showOptions)}
          className="cursor-pointer bg-zinc-700 hover:bg-zinc-600 text-white rounded-sm h-11 w-8 flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faEllipsis} className="w-4 h-4" />
        </div>
        {showOptions && (
          <div className="flex gap-3">
            <div
              onClick={() => {
                dispatch(
                  celebrate({
                    exercise: workout.name,
                    loggingType: workout.logging_type,
                    score: userWorkout.log,
                  }),
                );
              }}
              className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded-sm h-11 w-11 flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faShare} className="w-4 h-4" />
            </div>
            <div
              onClick={() => deleteWorkout(userWorkout.id)}
              className="cursor-pointer bg-red-600 hover:bg-red-700 text-white rounded-sm h-11 w-11 flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutListItem;
