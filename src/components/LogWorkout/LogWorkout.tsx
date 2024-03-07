'use client';

import { IWorkout } from '@/types/IWorkout';
import CrossFitOpen241 from '@/components/Forms/LoggingForms/CrossFitOpen241';
import { selectForm } from '@/components/Forms/LoggingForms';

type LogWorkoutProps = {
  currentPb?: string;
  close: () => void;
  workout: IWorkout;
};

const LogWorkout = ({ workout, close, currentPb }: LogWorkoutProps) => {
  if (workout.logging_type === 'tiebreak_time_or_reps') {
    return (
      <CrossFitOpen241
        movement={workout}
        close={close}
        submissionType="workout"
      />
    );
  } else {
    const Component = selectForm(workout.logging_type);

    return (
      <Component
        currentPb={currentPb}
        movement={workout}
        close={close}
        submissionType="workout"
      />
    );
  }
};

export default LogWorkout;
