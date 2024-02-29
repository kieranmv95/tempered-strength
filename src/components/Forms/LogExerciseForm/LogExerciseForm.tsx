'use client';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import { addSuccess } from '@/lib/features/userExercises/userExercisesSlice';
import * as Yup from 'yup';
import { useAppDispatch } from '@/lib/hooks';
import { useAuth } from '@clerk/nextjs';
import { Button } from '@/components';
import { IExercise, ILoggingType } from '@/types/IExercise';
import { celebrate } from '@/lib/features/celebration/celebrationSlice';
import { getCurrentDate } from '@/helpers/getCurrentDate';
import { getFormLabel } from '@/components/Forms/formHelpers';

type LogExerciseFormProps = {
  exercise: IExercise;
  close: () => void;
};

const LogExerciseForm = ({ exercise, close }: LogExerciseFormProps) => {
  const dispatch = useAppDispatch();
  const { userId } = useAuth();

  const ExerciseSchema = () => {
    const isDuration = exercise.logging_type === 'duration';
    const isWeight =
      exercise.logging_type === 'weight' || exercise.logging_type === 'reps';

    return Yup.object().shape({
      log: isWeight ? Yup.string().required('Required') : Yup.string(),
      date: Yup.date().required('Date is required'),
      durationGroup: Yup.object()
        .shape({
          HH: Yup.string(),
          MM: Yup.string(),
          SS: Yup.string(),
        })
        .test(
          'duration-validation',
          'At least one field must be provided',
          function (value) {
            if (!isDuration) return true;
            const { HH, MM, SS } = value;
            return HH !== '00' || MM !== '00' || SS !== '00';
          },
        ),
    });
  };

  return (
    <Formik
      initialValues={{
        log: '',
        date: getCurrentDate(),
        durationGroup: {
          HH: '00',
          MM: '00',
          SS: '00',
        },
      }}
      enableReinitialize={true}
      validationSchema={ExerciseSchema}
      onSubmit={async (values, { setSubmitting }) => {
        const { HH, MM, SS } = values.durationGroup;
        const concatDuration = `${HH}:${MM}:${SS}`;

        const data = {
          exerciseId: exercise.id,
          log: values.log,
          date: values.date,
          duration: concatDuration,
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
            duration: concatDuration,
            date: values.date,
          }),
        );

        let score;

        switch (exercise.logging_type) {
          case 'weight':
          case 'reps':
            score = Number(values.log);
            break;
          case 'duration':
            score = concatDuration;
            break;
        }

        dispatch(
          celebrate({
            exercise: exercise.name,
            loggingType: exercise.logging_type,
            score,
          }),
        );

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
              <label className="block mb-1">
                {getFormLabel(exercise.logging_type)}
              </label>
              {(exercise.logging_type === 'weight' ||
                exercise.logging_type === 'reps') && (
                <>
                  <Field
                    type="number"
                    name="log"
                    inputMode="decimal"
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
                </>
              )}
              {exercise.logging_type === 'duration' && (
                <>
                  <div className="flex items-center">
                    <Field
                      as="select"
                      name="durationGroup.HH"
                      placeholder="HH"
                      className="text-sm rounded block w-full p-2.5 bg-zinc-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 h-[40px]"
                    >
                      {Array.from({ length: 24 }).map((_, i) => {
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
                      name="durationGroup.MM"
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
                </>
              )}
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
