'use client';

import { LogWorkoutForm } from '@/components/Forms';
import { IWorkout } from '@/types/IWorkout';

type LogExerciseFormProps = {
  close: () => void;
  workout: IWorkout;
};

const LogWorkoutModal = ({ workout, close }: LogExerciseFormProps) => (
  <>
    <div className="fixed inset-0 z-40 bg-gray-500 bg-opacity-75 transition-opacity pointer" />
    <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
      <div className="flex min-h-full justify-center p-4 items-center sm:p-0">
        <LogWorkoutForm workout={workout} close={close} />
      </div>
    </div>
  </>
);

export default LogWorkoutModal;
