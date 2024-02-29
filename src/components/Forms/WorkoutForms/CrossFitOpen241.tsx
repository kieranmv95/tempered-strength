'use client';

import { useAppDispatch } from '@/lib/hooks';
import { useAuth } from '@clerk/nextjs';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { IWorkout } from '@/types/IWorkout';
import { Button } from '@/components';
import { getCurrentDate } from '@/helpers/getCurrentDate';
import { PostWorkoutParams } from '@/app/api/user/workouts/route';
import { addSuccess } from '@/lib/features/userWorkouts/userWorkoutsSlice';
import { celebrate } from '@/lib/features/celebration/celebrationSlice';

const CrossFitOpen241Schema = Yup.object().shape({
  date: Yup.date().required('Date is required'),
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
  currentPb?: string;
  workout: IWorkout;
  close: () => void;
};

const CrossFitOpen241 = ({
  workout,
  close,
  currentPb,
}: CrossFitOpen241Props) => {
  const dispatch = useAppDispatch();
  const { userId } = useAuth();

  return (
    <Formik
      validationSchema={CrossFitOpen241Schema}
      initialValues={{
        difficulty: 'RX',
        date: getCurrentDate(),
        completedAllReps: 'yes',
        repsCompleted: '',
        durationGroup: {
          MM: '00',
          SS: '00',
        },
      }}
      onSubmit={async (values, { setSubmitting }) => {
        const log = `${values.difficulty},${values.completedAllReps},${values.repsCompleted},${values.durationGroup.MM}:${values.durationGroup.SS}`;

        const data: PostWorkoutParams = {
          workoutId: workout.id,
          log,
          date: values.date,
        };

        const res = await fetch('/api/user/workouts', {
          method: 'POST',
          body: JSON.stringify(data),
        });

        const json = await res.json();

        dispatch(
          addSuccess({
            id: json.insertId,
            workoutId: workout.id,
            userId: userId || '',
            log,
            date: values.date,
          }),
        );

        dispatch(
          celebrate({
            exercise: workout.name,
            loggingType: workout.logging_type,
            score: log,
          }),
        );

        setSubmitting(false);
        close();
      }}
    >
      {({ isSubmitting, values }) => (
        <Form className="bg-zinc-800 p-6 rounded relative w-[340px]">
          <div
            className="absolute top-0 right-0 p-4 cursor-pointer"
            onClick={close}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </div>
          <p className="text-sm">{workout.workout_type}</p>
          <h2 className="text-xl font-bold mb-4">{workout.name}</h2>

          <div className="grid gap-4">
            <div>
              <div>
                <label className="block mb-1" htmlFor="date">
                  Date
                </label>
                <Field
                  type="date"
                  name="date"
                  autoComplete="off"
                  placeholder="dd/mm/yyyy"
                  className="text-sm rounded block w-full p-2.5 bg-zinc-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 h-[42px]"
                />
                <ErrorMessage
                  name="date"
                  render={msg => (
                    <div className="text-xs text-red-600 mt-2">{msg}</div>
                  )}
                />
              </div>
            </div>
            <div>
              <label className="block mb-1">Scaling</label>
              <Field
                as="select"
                name="difficulty"
                className="text-sm rounded block w-full p-2.5 bg-zinc-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 h-[40px]"
              >
                <option value="RX">RX</option>
                <option value="Scaled">Scaled</option>
                <option value="Foundation">Foundation</option>
              </Field>
            </div>

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
              <div>
                <label className="block mb-1">Reps Completed</label>
                <Field
                  type="number"
                  name="repsCompleted"
                  inputMode="decimal"
                  placeholder="0"
                  autoComplete="off"
                  className="text-sm rounded block w-full p-2.5 bg-zinc-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage
                  name="repsCompleted"
                  render={msg => (
                    <div className="text-xs text-red-600 mt-2">{msg}</div>
                  )}
                />
              </div>
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
                  className="text-sm rounded block w-full p-2.5 bg-zinc-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 h-[40px]"
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
                  className="text-sm rounded block w-full p-2.5 bg-zinc-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 h-[40px]"
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
