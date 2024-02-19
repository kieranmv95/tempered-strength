"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const BestsSchema = Yup.object().shape({
  username: Yup.string()
    .matches(
      /^[\w-]*$/,
      "Name can only contain letters, numbers, underscores, and hyphens",
    )
    .required("Username Required"),
});

const SearchForUserFormLarge = () => {
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        username: "",
      }}
      onSubmit={(values) => {
        router.push(`/user/${values.username}`);
      }}
      validationSchema={BestsSchema}
    >
      {({ isSubmitting }) => (
        <Form className="mt-6">
          <div className="flex gap-3">
            <Field
              type="text"
              name="username"
              placeholder="username"
              autoComplete="off"
              className="rounded block w-full p-2.5 bg-zinc-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-[44px] h-[44px] block bg-green-600 hover:bg-green-700 click:bg-green-600 rounded text-center"
            >
              <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />
            </button>
          </div>
          <ErrorMessage
            name="username"
            render={(msg) => (
              <div className="text-xs text-red-600 mt-2">{msg}</div>
            )}
          />
        </Form>
      )}
    </Formik>
  );
};

export default SearchForUserFormLarge;
