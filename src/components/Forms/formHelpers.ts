import { ILoggingType } from '@/types/IExercise';
import { IWorkoutLoggingType } from '@/types/IWorkout';

export const getFormLabel = (
  logging_type: ILoggingType | IWorkoutLoggingType,
) => {
  switch (logging_type) {
    case 'duration':
      return 'Duration (hh:mm:ss)';
    case 'weight':
      return 'Weight (kg)';
    case 'reps':
      return 'Reps';
    default:
      return '';
  }
};
