import { ILoggingType } from '@/types/IExercise';

export const getFormLabel = (logging_type: ILoggingType) => {
  switch (logging_type) {
    case 'duration':
      return 'Duration (hh:mm:ss)';
    case 'weight':
      return 'Weight (kg)';
    case 'reps':
      return 'Reps';
  }
};
