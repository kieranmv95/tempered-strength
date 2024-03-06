import { ILoggingType } from '@/types/IExercise';
import { IWorkoutLoggingType } from '@/types/IWorkout';

export const getUnits = (loggingType: ILoggingType | IWorkoutLoggingType) => {
  switch (loggingType) {
    case 'weight':
      return 'kg';
    case 'reps':
      return 'reps';
    default:
      return '';
  }
};

export const formatScore = (
  loggingType: ILoggingType | IWorkoutLoggingType,
  score: string | number,
) => {
  switch (loggingType) {
    case 'tiebreak_time_or_reps':
      let stringBuilder = '';
      const parts = (score as string).split(',');
      const completedWorkout = parts[1] === 'yes';

      if (completedWorkout) {
        stringBuilder = `<div>${parts[0]}<br/>${parts[3]}</div>`;
      } else {
        stringBuilder = `<div>${parts[0]}<br/>${parts[2]}reps<br/>Tiebreak Time: ${parts[3]}</div>`;
      }

      return stringBuilder;
    default:
      return `${score}${getUnits(loggingType)}`;
  }
};

export const formatShortScore = (
  loggingType: ILoggingType | IWorkoutLoggingType,
  score: string | number,
) => {
  switch (loggingType) {
    case 'tiebreak_time_or_reps':
      let stringBuilder = '';
      const parts = (score as string).split(',');
      const completedWorkout = parts[1] === 'yes';

      if (completedWorkout) {
        stringBuilder = `<div>${parts[0]}<br/>${parts[3]}</div>`;
      } else {
        stringBuilder = `<div>${parts[0]}<br/>${parts[2]}reps<br/>Tiebreak Time: ${parts[3]}</div>`;
      }

      return stringBuilder;
    default:
      return `${score}${getUnits(loggingType)}`;
  }
};
