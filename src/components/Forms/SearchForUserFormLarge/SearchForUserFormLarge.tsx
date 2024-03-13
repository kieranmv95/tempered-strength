'use client';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const BestsSchema = Yup.object().shape({
  username: Yup.string()
    .matches(
      /^[\w-]*$/,
      'Name can only contain letters, numbers, underscores, and hyphens',
    )
    .required('Username Required'),
});

const SearchForUserFormLarge = () => {
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        username: '',
      }}
      onSubmit={values => {
        router.push(`/user/${values.username}`);
      }}
      validationSchema={BestsSchema}
    >
      {({ isSubmitting }) => (
        <Form className="mt-8 md:mt-12">
          <div className="flex relative">
            <Field
              type="text"
              name="username"
              placeholder="username"
              autoComplete="off"
              className="py-4 px-6 bg-rand-500 rounded-full text-thom md:p-6 w-full"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-egwene-500 rounded-full text-rand-500 py-4 md:py-6 px-10 md:px-12 text-center absolute top-0 right-0"
            >
              Search
            </button>
          </div>

          <ErrorMessage
            name="username"
            render={msg => <div className="mt-3 text-danger-500">{msg}</div>}
          />
        </Form>
      )}
    </Formik>
  );
};

export default SearchForUserFormLarge;
