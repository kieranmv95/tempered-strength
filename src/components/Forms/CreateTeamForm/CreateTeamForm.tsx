'use client';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useAppDispatch } from '@/lib/hooks';
import { createTeam } from '@/lib/features/userTeams/userTeamsSlice';
import { Button } from '@/components';

const CreateTeamSchema = Yup.object().shape({
  name: Yup.string().required('required'),
  description: Yup.string(),
  password: Yup.string(),
});

type LogExerciseFormProps = {
  close: () => void;
};

const CreateTeamForm = ({ close }: LogExerciseFormProps) => {
  const dispatch = useAppDispatch();

  return (
    <Formik
      initialValues={{
        name: '',
        description: '',
        password: '',
      }}
      validationSchema={CreateTeamSchema}
      onSubmit={async (values, { setSubmitting }) => {
        const res = await dispatch(createTeam({ ...values })).unwrap();

        if (res.name) toast.success(`you joined ${res.name}`);
        if (res.err) toast.error(res.err);

        setSubmitting(false);
        close();
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <h2 className="text-xl font-bold mb-4">Create a new team!</h2>
          <div className="grid gap-4">
            <div>
              <label className="block mb-1" htmlFor="date">
                Team Name
              </label>
              <p className="text-sm mb-2">This will be visible to everyone</p>
              <Field
                type="text"
                name="name"
                placeholder="name"
                className="text-sm rounded block w-full p-2.5 bg-zinc-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                autoComplete="off"
              />
              <ErrorMessage
                name="name"
                render={msg => (
                  <div className="text-xs text-red-600 mt-2">{msg}</div>
                )}
              />
            </div>
            <div>
              <label className="block mb-1" htmlFor="date">
                Description
              </label>
              <Field
                type="text"
                name="description"
                placeholder="description"
                className="text-sm rounded block w-full p-2.5 bg-zinc-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                autoComplete="off"
              />
              <ErrorMessage
                name="description"
                render={msg => (
                  <div className="text-xs text-red-600 mt-2">{msg}</div>
                )}
              />
            </div>
            <div>
              <label className="block mb-1" htmlFor="date">
                Join code
              </label>
              <p className="text-sm mb-2">
                If you dont want random people joining set a code to enter,
                Leave blank to make it public
              </p>
              <Field
                type="text"
                name="password"
                placeholder="join code"
                className="text-sm rounded block w-full p-2.5 bg-zinc-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                autoComplete="off"
              />
              <ErrorMessage
                name="password"
                render={msg => (
                  <div className="text-xs text-red-600 mt-2">{msg}</div>
                )}
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              loading={isSubmitting}
              loadingText="Creating Team"
            >
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateTeamForm;
