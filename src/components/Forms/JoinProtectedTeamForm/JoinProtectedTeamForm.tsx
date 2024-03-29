'use client';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useAppDispatch } from '@/lib/hooks';
import { joinTeam } from '@/lib/features/userTeams/userTeamsSlice';
import { ITeam } from '@/types/ITeam';
import { Button } from '@/components';

const ProtectedTeamSchema = Yup.object().shape({
  password: Yup.string().required('Required'),
});

type LogExerciseFormProps = {
  team: ITeam;
  close: () => void;
};

const JoinProtectedTeamForm = ({ team, close }: LogExerciseFormProps) => {
  const dispatch = useAppDispatch();

  return (
    <Formik
      initialValues={{
        password: '',
      }}
      validationSchema={ProtectedTeamSchema}
      onSubmit={async (values, { setSubmitting }) => {
        const res = await dispatch(
          joinTeam({
            team: team.id.toString(),
            password: values.password,
          }),
        ).unwrap();

        if (res.name) toast.success(`you joined ${res.name}`);
        if (res.err) toast.error(res.err);

        setSubmitting(false);
        close();
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <h2 className="text-xl font-bold mb-4">
            Join &quot;{team.name}&quot;
          </h2>
          <div className="grid gap-4">
            <div>
              <label className="block mb-1" htmlFor="date">
                Join Code
              </label>
              <Field
                type="text"
                name="password"
                placeholder="Join code"
                autoComplete="off"
                className="text-sm rounded block w-full p-2.5 bg-rand-500 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
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
            >
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default JoinProtectedTeamForm;
