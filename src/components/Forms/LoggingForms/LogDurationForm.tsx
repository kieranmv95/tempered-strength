'use client';

import { Form, Formik } from 'formik';
import { addSuccess } from '@/lib/features/userExercises/userExercisesSlice';
import * as Yup from 'yup';
import { useAppDispatch } from '@/lib/hooks';
import { useAuth } from '@clerk/nextjs';
import { Button } from '@/components';
import { IExercise } from '@/types/IExercise';
import { celebrate } from '@/lib/features/celebration/celebrationSlice';
import toast from 'react-hot-toast';
import DurationField, {
  durationFieldInitialValues,
  durationFieldSchema,
} from '@/components/Forms/FormComponents/DurationField';
import DateField, {
  dateFieldInitialValues,
  dateFieldSchema,
} from '@/components/Forms/FormComponents/DateField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import FormGroup from '@/components/Forms/FormComponents/FormGroup';
import { IWorkout } from '@/types/IWorkout';

type LogDurationFormProps = {
  currentPb?: string | number;
  movement: IExercise | IWorkout;
  close: () => void;
};

const DurationFormSchema = Yup.object().shape({
  ...dateFieldSchema('date'),
  ...durationFieldSchema('durationGroup'),
});

const LogDurationForm = ({
  movement,
  close,
  currentPb,
}: LogDurationFormProps) => {
  const dispatch = useAppDispatch();
  const { userId } = useAuth();

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

        const data = {
          exerciseId: movement.id,
          date: values.date,
          duration: concatDuration,
          loggingType: movement.logging_type,
        };

        try {
          const res = await fetch('/api/user/exercises', {
            method: 'POST',
            body: JSON.stringify(data),
          });

          const json = await res.json();

          dispatch(
            addSuccess({
              id: json.insertId,
              exerciseId: movement.id,
              userId: userId || '',
              duration: concatDuration,
              date: values.date,
            }),
          );

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
        } catch (e) {
          toast.error('Failed to save exercise');
          setSubmitting(false);
          close();
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <FontAwesomeIcon
            icon={faX}
            className="absolute top-0 right-0 p-4 cursor-pointer"
            onClick={close}
          />
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
