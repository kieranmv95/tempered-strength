'use client';

import { Form, Formik } from 'formik';
import { addSuccess } from '@/lib/features/userExercises/userExercisesSlice';
import * as Yup from 'yup';
import { useAppDispatch } from '@/lib/hooks';
import { useAuth } from '@clerk/nextjs';
import { Button } from '@/components';
import { IExercise } from '@/types/IExercise';
import { celebrate } from '@/lib/features/celebration/celebrationSlice';
import { getFormLabel } from '@/components/Forms/formHelpers';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NumberField, {
  numberFieldInitialValues,
  numberFieldSchema,
} from '@/components/Forms/FormComponents/NumberField';
import DateField, {
  dateFieldInitialValues,
  dateFieldSchema,
} from '@/components/Forms/FormComponents/DateField';
import FormGroup from '@/components/Forms/FormComponents/FormGroup';

type LogWeightRepsFormProps = {
  currentPb?: string | number;
  exercise: IExercise;
  close: () => void;
};

const WeightRepsSchema = Yup.object().shape({
  ...numberFieldSchema('log'),
  ...dateFieldSchema('date'),
});

const LogWeightRepsForm = ({
  exercise,
  close,
  currentPb,
}: LogWeightRepsFormProps) => {
  const dispatch = useAppDispatch();
  const { userId } = useAuth();

  return (
    <Formik
      initialValues={{
        ...numberFieldInitialValues('log'),
        ...dateFieldInitialValues('date'),
      }}
      enableReinitialize={true}
      validationSchema={WeightRepsSchema}
      onSubmit={async (values, { setSubmitting }) => {
        const data = {
          exerciseId: exercise.id,
          log: values.log,
          date: values.date,
          loggingType: exercise.logging_type,
        };

        const res = await fetch('/api/user/exercises', {
          method: 'POST',
          body: JSON.stringify(data),
        });

        const json = await res.json();

        dispatch(
          addSuccess({
            id: json.insertId,
            exerciseId: exercise.id,
            userId: userId || '',
            log: Number(values.log),
            date: values.date,
          }),
        );

        dispatch(
          celebrate({
            existingPersonalBest: currentPb,
            exercise: exercise.name,
            loggingType: exercise.logging_type,
            score: Number(values.log),
          }),
        );

        setSubmitting(false);
        close();
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <FontAwesomeIcon
            icon={faX}
            className="absolute top-0 right-0 p-4 cursor-pointer"
            onClick={close}
          />
          <h2 className="text-xl font-bold mb-4">{exercise.name}</h2>
          <div className="grid gap-4">
            <FormGroup
              label={getFormLabel(exercise.logging_type)}
              id="weightReps"
              groupName="log"
            >
              <NumberField id="weightReps" groupName="log" />
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

export default LogWeightRepsForm;
