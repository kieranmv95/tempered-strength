'use client';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import { addSuccess } from '@/lib/features/userExercises/userExercisesSlice';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useAppDispatch } from '@/lib/hooks';
import { IExercise } from '@/app/api/user/exercises/route';
import { useAuth } from '@clerk/nextjs';
import { Button } from '@/components';

const ExerciseSchema = Yup.object().shape({
  log: Yup.number().required('Required'),
  date: Yup.date().required('Required'),
});

type LogExerciseFormProps = {
  exercise: IExercise;
  close: () => void;
};

const LogExerciseForm = ({ exercise, close }: LogExerciseFormProps) => {
  const dispatch = useAppDispatch();
  const { userId } = useAuth();

  return (
    <Formik
      initialValues={{
        log: '',
        date: '',
      }}
      validationSchema={ExerciseSchema}
      onSubmit={async (values, { setSubmitting }) => {
        const data = {
          exerciseId: exercise.id,
          log: values.log,
          date: values.date,
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

        toast.success('Exercise Logged');

        setSubmitting(false);
        close();
      }}
    >
      {({ isSubmitting }) => (
        <Form className="bg-zinc-800 p-6 rounded relative w-[300px]">
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
          <h2 className="text-xl font-bold mb-4">{exercise.name}</h2>
          <div className="grid gap-4">
            <div>
              <label className="block mb-1" htmlFor="date">
                {exercise.logging_type === 'weight' ? 'Weight (kg)' : 'Reps'}
              </label>
              <Field
                type="number"
                name="log"
                inputMode="numeric"
                placeholder="100"
                autoComplete="off"
                className="text-sm rounded block w-full p-2.5 bg-zinc-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              />
              <ErrorMessage
                name="log"
                render={msg => (
                  <div className="text-xs text-red-600 mt-2">{msg}</div>
                )}
              />
            </div>
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

export default LogExerciseForm;
