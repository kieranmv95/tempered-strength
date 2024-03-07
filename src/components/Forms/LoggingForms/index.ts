import LogDurationForm from '@/components/Forms/LoggingForms/LogDurationForm';
import LogWeightRepsForm from '@/components/Forms/LoggingForms/LogWeightRepsForm';
import { IExercise, ILoggingType } from '@/types/IExercise';
import { IWorkout, IWorkoutLoggingType } from '@/types/IWorkout';

export type IFormSubmissionTypes = 'exercise' | 'workout';

export type LoggingFormProps = {
  currentPb?: string | number;
  movement: IExercise | IWorkout;
  close: () => void;
  submissionType: IFormSubmissionTypes;
};

export const selectForm = (
  logging_type: ILoggingType | IWorkoutLoggingType,
) => {
  switch (logging_type) {
    case 'duration':
      return LogDurationForm;
    case 'weight':
    case 'reps':
      return LogWeightRepsForm;
    default:
      return LogWeightRepsForm;
  }
};
