'use client';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';

const CompareSchema = Yup.object().shape({
  userOne: Yup.string()
    .matches(
      /^[\w-]*$/,
      'Name can only contain letters, numbers, underscores, and hyphens',
    )
    .required('Username Required'),
  userTwo: Yup.string()
    .matches(
      /^[\w-]*$/,
      'Name can only contain letters, numbers, underscores, and hyphens',
    )
    .required('Username Required'),
});

export default function Compare() {
  const router = useRouter();

  return (
    <div className="px-4 py-12 mx-auto w-full max-w-[600px]">
      <h2 className="text-2xl font-bold lg:text-4xl mb-6">Compare Users</h2>
      <p>
        It&apos;s as simple as putting in two usernames and hitting compare and
        then you can start comparing stats!
      </p>
      <Formik
        initialValues={{
          userOne: '',
          userTwo: '',
        }}
        onSubmit={values => {
          router.push(`/compare/${values.userOne}/${values.userTwo}`);
        }}
        validationSchema={CompareSchema}
      >
        {({ isSubmitting }) => (
          <Form className="mt-6">
            <div className="grid gap-4 items-center">
              <div className="grid gap-4 md:grid-cols-2 md:gap-12">
                <div>
                  <label className="block mb-1" htmlFor="date">
                    User One
                  </label>
                  <Field
                    type="text"
                    name="userOne"
                    placeholder="username"
                    autoComplete="off"
                    className="rounded block w-full p-2.5 bg-zinc-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 mt-2"
                  />
                  <ErrorMessage
                    name="userOne"
                    render={msg => (
                      <div className="text-xs text-red-600 mt-2">{msg}</div>
                    )}
                  />
                </div>
                <div>
                  <label className="block mb-1" htmlFor="date">
                    User Two
                  </label>
                  <Field
                    type="text"
                    name="userTwo"
                    placeholder="username"
                    autoComplete="off"
                    className="rounded block w-full p-2.5 bg-zinc-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 mt-2"
                  />
                  <ErrorMessage
                    name="userTwo"
                    render={msg => (
                      <div className="text-xs text-red-600 mt-2">{msg}</div>
                    )}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full block bg-green-600 hover:bg-green-700 click:bg-green-600 py-2 px-4 rounded text-center md:w-[250px]"
              >
                Compare Users
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
