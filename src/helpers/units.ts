import { ILoggingType } from '@/types/IExercise';

export const getUnits = (loggingType: ILoggingType) => {
  switch (loggingType) {
    case 'weight':
      return 'kg';
    case 'reps':
      return 'reps';
    default:
      return '';
  }
};
