"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useAppDispatch } from "@/lib/hooks";
import { joinTeam } from "@/lib/features/userTeams/userTeamsSlice";
import { ITeam } from "@/types/Team";

const ProtectedTeamSchema = Yup.object().shape({
  password: Yup.string().required("Required"),
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
        password: "",
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
          <h2 className="text-xl font-bold mb-4">
            Join &quot;{team.name}&quot;
          </h2>
          <div className="grid gap-4">
            <div>
              <label className="block mb-1" htmlFor="date">
                Password
              </label>
              <Field
                type="password"
                name="password"
                placeholder="password"
                className="text-sm rounded block w-full p-2.5 bg-zinc-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              />
              <ErrorMessage
                name="password"
                render={(msg) => (
                  <div className="text-xs text-red-600 mt-2">{msg}</div>
                )}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full block bg-green-600 hover:bg-green-700 click:bg-green-600 py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default JoinProtectedTeamForm;
