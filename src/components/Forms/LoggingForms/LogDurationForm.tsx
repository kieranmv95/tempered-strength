'use client';

import { Form, Formik } from 'formik';
import { postUserExercise } from '@/lib/features/userExercises/userExercisesSlice';
import * as Yup from 'yup';
import { useAppDispatch } from '@/lib/hooks';
import { Button } from '@/components';
import { ILoggingType } from '@/types/IExercise';
import { celebrate } from '@/lib/features/celebration/celebrationSlice';
import DurationField, {
  durationFieldInitialValues,
  durationFieldSchema,
} from '@/components/Forms/FormComponents/DurationField';
import DateField, {
  dateFieldInitialValues,
  dateFieldSchema,
} from '@/components/Forms/FormComponents/DateField';
import FormGroup from '@/components/Forms/FormComponents/FormGroup';
import { LoggingFormProps } from '@/components/Forms/LoggingForms/index';
import { postUserWorkout } from '@/lib/features/userWorkouts/userWorkoutsSlice';

const DurationFormSchema = Yup.object().shape({
  ...dateFieldSchema('date'),
  ...durationFieldSchema('durationGroup'),
});

const LogDurationForm = ({
  movement,
  close,
  currentPb,
  submissionType,
}: LoggingFormProps) => {
  const dispatch = useAppDispatch();
  return (
    <Formik
      initialValues={{
        log: '',
        ...dateFieldInitialValues('date'),
        ...durationFieldInitialValues('durationGroup'),
      }}
      enableReinitialize={true}
      validationSchema={DurationFormSchema}
      onSubmit={async (values, { setSubmitting }) => {
        const { HH, MM, SS } = values.durationGroup;
        const concatDuration = `${HH}:${MM}:${SS}`;

        if (submissionType === 'exercise') {
          await dispatch(
            postUserExercise({
              id: movement.id,
              date: values.date,
              duration: concatDuration,
              loggingType: movement.logging_type as ILoggingType,
            }),
          ).unwrap();
        }

        if (submissionType === 'workout') {
          await dispatch(
            postUserWorkout({
              workoutId: movement.id,
              log: concatDuration,
              date: values.date,
            }),
          ).unwrap();
        }

        dispatch(
          celebrate({
            existingPersonalBest: currentPb,
            exercise: movement.name,
            loggingType: movement.logging_type,
            score: concatDuration,
          }),
        );

        setSubmitting(false);
        close();
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <h2 className="text-xl font-bold mb-4">{movement.name}</h2>
          <div className="grid gap-4">
            <FormGroup
              label="Duration (hh:mm:ss)"
              id="duration"
              groupName="durationGroup"
            >
              <DurationField id="duration" groupName="durationGroup" />
            </FormGroup>

            <FormGroup label="Date" id="date" groupName="date">
              <DateField id="date" groupName="date" />
            </FormGroup>

            <Button
              type="submit"
              disabled={isSubmitting}
              loading={isSubmitting}
              loadingText="Adding"
            >
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LogDurationForm;
