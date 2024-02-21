import { ILoggingType } from '@/app/api/user/exercises/route';

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
