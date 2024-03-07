'use client';

import { IExercise } from '@/types/IExercise';
import { selectForm } from '@/components/Forms/LoggingForms';

type LogExerciseProps = {
  currentPb?: string | number;
  close: () => void;
  exercise: IExercise;
};

const LogExercise = ({ exercise, close, currentPb }: LogExerciseProps) => {
  const Component = selectForm(exercise.logging_type);

  return (
    <Component
      currentPb={currentPb}
      movement={exercise}
      close={close}
      submissionType="exercise"
    />
  );
};

export default LogExercise;
