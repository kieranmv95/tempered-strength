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
import { IWorkout } from '@/types/IWorkout';

type LogWeightRepsFormProps = {
  currentPb?: string | number;
  movement: IExercise | IWorkout;
  close: () => void;
};

const WeightRepsSchema = Yup.object().shape({
  ...numberFieldSchema('log'),
  ...dateFieldSchema('date'),
});

const LogWeightRepsForm = ({
  movement,
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
          exerciseId: movement.id,
          log: values.log,
          date: values.date,
          loggingType: movement.logging_type,
        };

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
            log: Number(values.log),
            date: values.date,
          }),
        );

        dispatch(
          celebrate({
            existingPersonalBest: currentPb,
            exercise: movement.name,
            loggingType: movement.logging_type,
            score: Number(values.log),
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
              label={getFormLabel(movement.logging_type)}
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
