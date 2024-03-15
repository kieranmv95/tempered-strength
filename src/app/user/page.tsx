'use client';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { Button } from '@/components';
import { Box, Container, Title } from '@/components/DesignSystemElements';

const BestsSchema = Yup.object().shape({
  username: Yup.string()
    .matches(
      /^[\w-]*$/,
      'Name can only contain letters, numbers, underscores, and hyphens',
    )
    .required('Username Required'),
});

export default function Compare() {
  const router = useRouter();

  return (
    <Container>
      <Title className="mb-6">SEARCH FOR A USER</Title>
      <Box className="md:w-full md:max-w-2xl">
        <p>
          It&apos;s as simple as putting in a username and hitting search then
          you can start analysing lift data
        </p>
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
                    autoComplete="off"
                    className="rounded block w-full p-2.5 bg-rand-500 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 mt-2"
                  />
                  <ErrorMessage
                    name="username"
                    render={msg => (
                      <div className="text-xs text-red-600 mt-2">{msg}</div>
                    )}
                  />
                </div>
                <div>
                  <Button type="submit" disabled={isSubmitting}>
                    Search
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
}
