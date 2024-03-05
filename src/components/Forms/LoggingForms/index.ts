import LogDurationForm from '@/components/Forms/LoggingForms/LogDurationForm';
import LogWeightRepsForm from '@/components/Forms/LoggingForms/LogWeightRepsForm';
import { ILoggingType } from '@/types/IExercise';

export const selectForm = (logging_type: ILoggingType) => {
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
