'use client';

import { LogWorkoutForm } from '@/components/Forms';
import { IWorkout } from '@/types/IWorkout';
import CrossFitOpen241 from '@/components/Forms/WorkoutForms/CrossFitOpen241';

type LogExerciseFormProps = {
  currentPb?: string;
  close: () => void;
  workout: IWorkout;
};

const LogWorkoutModal = ({
  workout,
  close,
  currentPb,
}: LogExerciseFormProps) => (
  <>
    <div className="fixed inset-0 z-40 bg-gray-500 bg-opacity-75 transition-opacity pointer" />
    <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
      <div className="flex min-h-full justify-center p-4 items-center sm:p-0">
        {workout.logging_type === 'tiebreak_time_or_reps' ? (
          <CrossFitOpen241
            currentPb={currentPb}
            workout={workout}
            close={close}
          />
        ) : (
          <LogWorkoutForm
            currentPb={currentPb}
            workout={workout}
            close={close}
          />
        )}
      </div>
    </div>
  </>
);

export default LogWorkoutModal;
