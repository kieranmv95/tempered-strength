'use client';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { Button } from '@/components';
import { Box, Container, Title } from '@/components/DesignSystemElements';

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
    <Container>
      <Title className="mb-6">COMPARE USERS</Title>
      <Box className="md:w-full md:max-w-2xl">
        <p>
          It&apos;s as simple as putting in two usernames and hitting compare
          and then you can start comparing stats!
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
                      className="rounded block w-full p-2.5 bg-rand-500 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 mt-2"
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
                      className="rounded block w-full p-2.5 bg-rand-500 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 mt-2"
                    />
                    <ErrorMessage
                      name="userTwo"
                      render={msg => (
                        <div className="text-xs text-red-600 mt-2">{msg}</div>
                      )}
                    />
                  </div>
                </div>
                <div>
                  <Button type="submit" disabled={isSubmitting}>
                    Compare Users
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
