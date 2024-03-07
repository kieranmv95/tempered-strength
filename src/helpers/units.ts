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
  let stringBuilder = '';
  let parts;
  switch (loggingType) {
    case '24.1':
      parts = (score as string).split(',');
      const completedWorkout = parts[1] === 'yes';

      if (completedWorkout) {
        stringBuilder = `<div>${parts[0]}<br/>${parts[3]}</div>`;
      } else {
        stringBuilder = `<div>${parts[0]}<br/>${parts[2]}reps<br/>Tiebreak Time: ${parts[3]}</div>`;
      }
      break;
    case '24.2':
      parts = (score as string).split(',');
      stringBuilder = `<div>${parts[0]}<br/>${parts[1]}</div>`;
      break;
    default:
      stringBuilder = `${score}${getUnits(loggingType)}`;
      break;
  }

  return stringBuilder;
};
