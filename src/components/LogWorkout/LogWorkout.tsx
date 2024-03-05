'use client';

import { LogWorkoutForm } from '@/components/Forms';
import { IWorkout } from '@/types/IWorkout';
import CrossFitOpen241 from '@/components/Forms/LoggingForms/CrossFitOpen241';

type LogWorkoutProps = {
  currentPb?: string;
  close: () => void;
  workout: IWorkout;
};

const LogWorkout = ({ workout, close, currentPb }: LogWorkoutProps) => {
  if (workout.logging_type === 'tiebreak_time_or_reps') {
    return <CrossFitOpen241 workout={workout} close={close} />;
  } else {
    return (
      <LogWorkoutForm currentPb={currentPb} workout={workout} close={close} />
    );
  }
};

export default LogWorkout;
