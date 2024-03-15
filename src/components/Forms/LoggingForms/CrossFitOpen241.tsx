'use client';

import { useAppDispatch } from '@/lib/hooks';
import { Formik, Form, Field, ErrorMessage } from 'formik';
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
} from '@/components/Forms/FormComponents/NumberField';
import SelectField, {
  selectFieldInitialValues,
  SelectOption,
} from '@/components/Forms/FormComponents/SelectField';

const CrossFitOpen241Schema = Yup.object().shape({
  ...dateFieldSchema('date'),
  completedAllReps: Yup.string().required(),
  repsCompleted: Yup.number()
    .nullable()
    .test('repsCompleted-test', 'Reps Completed Required', function (value) {
      // "this" context provides access to the sibling fields via this.parent
      const { completedAllReps } = this.parent;
      // If completedAllReps is 'no', then repsCompleted is required and must be a number greater than or equal to 0
      if (completedAllReps === 'no') {
        return (
          value !== null && !isNaN(value as number) && (value as number) >= 0
        );
      }
      // If completedAllReps is not 'no', repsCompleted is not required
      return true; // Validation passes if completedAllReps is not 'no'
    }),
  durationGroup: Yup.object()
    .shape({
      MM: Yup.string(),
      SS: Yup.string(),
    })
    .test(
      'duration-validation',
      'At least one field must be provided',
      function (value) {
        const { MM, SS } = value;
        return MM !== '00' || SS !== '00';
      },
    ),
});

type CrossFitOpen241Props = {
  currentPb?: string | number;
  movement: IWorkout;
  close: () => void;
  submissionType: IFormSubmissionTypes;
};

const CrossFitOpen241 = ({ movement, close }: CrossFitOpen241Props) => {
  const dispatch = useAppDispatch();

  const scalingOptions: SelectOption[] = [
    { key: 'RX', value: 'RX' },
    { key: 'Scaled', value: 'Scaled' },
    { key: 'Foundation', value: 'Foundation' },
  ];

  return (
    <Formik
      validationSchema={CrossFitOpen241Schema}
      initialValues={{
        ...selectFieldInitialValues('difficulty', scalingOptions[0]),
        ...dateFieldInitialValues('date'),
        completedAllReps: 'yes',
        ...numberFieldInitialValues('repsCompleted'),
        durationGroup: {
          MM: '00',
          SS: '00',
        },
      }}
      onSubmit={async (values, { setSubmitting }) => {
        const log = `${values.difficulty},${values.completedAllReps},${values.repsCompleted},${values.durationGroup.MM}:${values.durationGroup.SS}`;

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
      {({ isSubmitting, values }) => (
        <Form>
          <p className="text-sm">{movement.workout_type}</p>
          <h2 className="text-xl font-bold mb-4">{movement.name}</h2>

          <div className="grid gap-4">
            <FormGroup label="Date" id="date" groupName="date">
              <DateField id="date" groupName="date" />
            </FormGroup>

            <FormGroup label="Scaling" id="scaling" groupName="difficulty">
              <SelectField
                id="scaling"
                groupName="difficulty"
                options={scalingOptions}
              />
            </FormGroup>

            <div
              role="group"
              aria-labelledby="my-radio-group"
              className="grid gap-2"
            >
              <label className="flex gap-2">
                <Field type="radio" name="completedAllReps" value="yes" />
                <div>
                  Completed all <span className="font-bold">180 reps</span>
                </div>
              </label>
              <label className="flex gap-2">
                <Field type="radio" name="completedAllReps" value="no" />
                <div>
                  Completed fewer than{' '}
                  <span className="font-bold">180 reps</span>
                </div>
              </label>
            </div>

            {values.completedAllReps === 'no' && (
              <FormGroup
                label="Reps Completed"
                id="repsCompleted"
                groupName="repsCompleted"
              >
                <NumberField id="repsCompleted" groupName="repsCompleted" />
              </FormGroup>
            )}

            <div>
              <label className="block mb-1">
                {values.completedAllReps === 'yes'
                  ? 'Time to complete (MM:SS)'
                  : 'Tiebreak time (MM:SS)'}
              </label>
              <div className="flex items-center">
                <Field
                  as="select"
                  name="durationGroup.MM"
                  placeholder="MM"
                  className="text-sm rounded block w-full p-2.5 bg-rand-500 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 h-[40px]"
                >
                  {Array.from({ length: 16 }).map((_, i) => {
                    return (
                      <option
                        key={i.toString().padStart(2, '0')}
                        value={i.toString().padStart(2, '0')}
                      >
                        {i.toString().padStart(2, '0')}
                      </option>
                    );
                  })}
                </Field>
                <div className="text-2xl font-light px-1">:</div>
                <Field
                  as="select"
                  name="durationGroup.SS"
                  placeholder="MM"
                  className="text-sm rounded block w-full p-2.5 bg-rand-500 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 h-[40px]"
                >
                  {Array.from({ length: 60 }).map((_, i) => {
                    return (
                      <option
                        key={i.toString().padStart(2, '0')}
                        value={i.toString().padStart(2, '0')}
                      >
                        {i.toString().padStart(2, '0')}
                      </option>
                    );
                  })}
                </Field>
              </div>
              <ErrorMessage
                name="durationGroup"
                render={msg => (
                  <div className="text-xs text-red-600 mt-2">{msg}</div>
                )}
              />
            </div>
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

export default CrossFitOpen241;
