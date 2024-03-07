'use client';

import { useAppDispatch } from '@/lib/hooks';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { IWorkout } from '@/types/IWorkout';
import { Button } from '@/components';
import { postUserWorkout } from '@/lib/features/userWorkouts/userWorkoutsSlice';
import { celebrate } from '@/lib/features/celebration/celebrationSlice';
import { IFormSubmissionTypes } from '@/components/Forms/LoggingForms/index';
import DateField, {
  dateFieldInitialValues,
  dateFieldSchema,
} from '@/components/Forms/FormComponents/DateField';
import FormGroup from '@/components/Forms/FormComponents/FormGroup';
import NumberField, {
  numberFieldInitialValues,
  numberFieldSchema,
} from '@/components/Forms/FormComponents/NumberField';

const CrossFitOpen242Schema = Yup.object().shape({
  ...dateFieldSchema('date'),
  ...numberFieldSchema('log'),
});

type CrossFitOpen242Props = {
  currentPb?: string | number;
  movement: IWorkout;
  close: () => void;
  submissionType: IFormSubmissionTypes;
};

const CrossFitOpen242 = ({ movement, close }: CrossFitOpen242Props) => {
  const dispatch = useAppDispatch();

  return (
    <Formik
      validationSchema={CrossFitOpen242Schema}
      initialValues={{
        difficulty: 'RX',
        ...dateFieldInitialValues('date'),
        ...numberFieldInitialValues('log'),
      }}
      onSubmit={async (values, { setSubmitting }) => {
        const log = `${values.difficulty},${values.log}`;

        await dispatch(
          postUserWorkout({
            workoutId: movement.id,
            log,
            date: values.date,
          }),
        ).unwrap();

        dispatch(
          celebrate({
            exercise: movement.name,
            loggingType: movement.logging_type,
            score: log,
          }),
        );

        setSubmitting(false);
        close();
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <p className="text-sm">{movement.workout_type}</p>
          <h2 className="text-xl font-bold mb-4">{movement.name}</h2>

          <div className="grid gap-4">
            <FormGroup label="Date" id="date" groupName="date">
              <DateField id="date" groupName="date" />
            </FormGroup>

            <FormGroup label="Scaling" id="scaling" groupName="difficulty">
              <Field
                as="select"
                name="difficulty"
                className="text-sm rounded block w-full p-2.5 bg-zinc-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 h-[40px]"
              >
                <option value="RX">RX</option>
                <option value="Scaled">Scaled</option>
                <option value="Foundation">Foundation</option>
              </Field>
            </FormGroup>

            <FormGroup label="Log" id="log" groupName="log">
              <NumberField id="log" groupName="log" />
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

export default CrossFitOpen242;
