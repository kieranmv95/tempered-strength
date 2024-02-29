'use client';

import { LogExerciseForm } from '@/components/Forms';
import { IExercise } from '@/types/IExercise';

type LogExerciseFormProps = {
  currentPb?: string | number;
  close: () => void;
  exercise: IExercise;
};

const LogExerciseModal = ({
  exercise,
  close,
  currentPb,
}: LogExerciseFormProps) => (
  <>
    <div className="fixed inset-0 z-40 bg-gray-500 bg-opacity-75 transition-opacity pointer" />
    <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
      <div className="flex min-h-full justify-center p-4 items-center sm:p-0">
        <LogExerciseForm
          currentPb={currentPb}
          exercise={exercise}
          close={close}
        />
      </div>
    </div>
  </>
);

export default LogExerciseModal;
