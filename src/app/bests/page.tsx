"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

const BestsSchema = Yup.object().shape({
  username: Yup.string()
    .matches(
      /^[\w-]*$/,
      "Name can only contain letters, numbers, underscores, and hyphens",
    )
    .required("Username Required"),
});

export default function Compare() {
  const router = useRouter();

  return (
    <div className="px-4 py-12 mx-auto w-full max-w-[600px] md:text-center">
      <h2 className="text-2xl font-bold lg:text-4xl mb-6 text-center">
        Search for a user
      </h2>
      <Formik
        initialValues={{
          username: "",
        }}
        onSubmit={(values) => {
          router.push(`/bests/${values.username}`);
        }}
        validationSchema={BestsSchema}
      >
        {({ isSubmitting }) => (
          <Form className="mt-6">
            <div className="grid gap-4 items-center">
              <div>
                <label className="block mb-1" htmlFor="date">
                  Username
                </label>
                <Field
                  type="text"
                  name="username"
                  placeholder="username"
                  className="rounded block w-full p-2.5 bg-zinc-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 mt-2"
                />
                <ErrorMessage
                  name="username"
                  render={(msg) => (
                    <div className="text-xs text-red-600 mt-2">{msg}</div>
                  )}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full block bg-green-600 hover:bg-green-700 click:bg-green-600 py-2 px-4 rounded text-center md:w-[250px]  md:mx-auto md:mt-6"
              >
                Search
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}