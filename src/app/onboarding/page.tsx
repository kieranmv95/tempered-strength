"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

const OnboardingSchema = Yup.object().shape({
  username: Yup.string()
    .matches(
      /^[\w-]*$/,
      "Name can only contain letters, numbers, underscores, and hyphens",
    )
    .required("Username Required"),
});

export default function Page() {
  const router = useRouter();

  return (
    <div className="w-full max-w-[800px] px-4 mx-auto pt-12">
      <h1 className="text-2xl font-bold lg:text-4xl mb-6">
        Welcome to Tempered Strength
      </h1>
      <p>First things first, lets get you set up</p>
      <Formik
        initialValues={{
          username: "",
        }}
        onSubmit={async (values, { setSubmitting, setFieldError }) => {
          const data = {
            username: values.username,
          };

          const res = await fetch("/api/username/check", {
            method: "POST",
            body: JSON.stringify(data),
          });

          const usernameCheck = await res.json();

          if (!usernameCheck.length) {
            await fetch("/api/user/create", {
              method: "POST",
              body: JSON.stringify(data),
            });
            setSubmitting(false);
            toast.success("Username Added");
            router.push("/dashboard");
          } else {
            toast.error("Username already exists");
            return setFieldError("username", "Username already exists");
          }
        }}
        validationSchema={OnboardingSchema}
      >
        {({ isSubmitting }) => (
          <Form className="mt-6">
            <div className="grid gap-4">
              <div>
                <label className="block mb-1" htmlFor="date">
                  Username
                </label>
                <p className="text-sm">
                  Pick carefully, this is your unique public username
                </p>
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
                className="w-full block bg-green-600 hover:bg-green-700 click:bg-green-600 py-2 px-4 rounded"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
