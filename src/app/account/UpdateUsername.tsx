"use client";

import { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useAppDispatch } from "@/lib/hooks";
import { updateUsername } from "@/lib/features/user/userSlice";
import { UpdateUserParams } from "@/app/api/user/update/route";
import { IUser } from "@/types/IUser";

const UsernameSchema = Yup.object().shape({
  username: Yup.string()
    .matches(
      /^[\w-]*$/,
      "Name can only contain letters, numbers, underscores, and hyphens",
    )
    .required("Username Required"),
});

type UpdateUsernameProps = {
  user: IUser;
};

const UpdateUsername = ({ user }: UpdateUsernameProps) => {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const dispatch = useAppDispatch();
  const showForm = () => {
    setShowUpdateForm(true);
  };

  useEffect(() => {
    if (showUpdateForm) {
      document.getElementById("username")?.focus();
    }
  }, [showUpdateForm]);

  return (
    <>
      <div>
        {!showUpdateForm ? (
          <>
            <p className="mb-1">Username</p>
            <div
              className="rounded block w-full p-2.5 bg-zinc-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 mt-2"
              onClick={showForm}
            >
              {user.username}
            </div>
          </>
        ) : (
          <Formik
            initialValues={{
              username: user.username || "",
            }}
            enableReinitialize={true}
            onSubmit={async (values, { setSubmitting, setFieldError }) => {
              if (user.username === values.username) {
                toast.success("Username updated");
                setShowUpdateForm(false);
              } else {
                const res = await fetch("/api/username/check", {
                  method: "POST",
                  body: JSON.stringify({
                    username: values.username,
                  }),
                });

                const usernameCheck = await res.json();

                if (!usernameCheck.length) {
                  const userChanges: UpdateUserParams = {
                    field: "username",
                    user: {
                      ...user,
                      username: values.username,
                    },
                  };

                  const updatedUser = await fetch("/api/user/update", {
                    method: "POST",
                    body: JSON.stringify(userChanges),
                  });

                  const resData = await updatedUser.json();

                  dispatch(updateUsername(resData.username));

                  setSubmitting(false);
                  toast.success("Username Added");
                  setShowUpdateForm(false);
                } else {
                  toast.error("Username already exists");
                  return setFieldError("username", "Username already exists");
                }
              }
            }}
            validationSchema={UsernameSchema}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="grid gap-4">
                  <div>
                    <label className="block mb-1" htmlFor="date">
                      Username
                    </label>
                    <Field
                      id="username"
                      type="text"
                      name="username"
                      placeholder="username"
                      className="rounded block w-full p-2.5 bg-zinc-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 mt-2"
                    />
                    <ErrorMessage
                      name="username"
                      render={(msg) => (
                        <div className="text-xs text-red-400 mt-2">{msg}</div>
                      )}
                    />
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setShowUpdateForm(false)}
                        className="w-full block bg-blue-600 hover:bg-blue-700 click:bg-blue-600 py-2 px-4 rounded mt-3 md:w-36"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full block bg-green-600 hover:bg-green-700 click:bg-green-600 py-2 px-4 rounded mt-3 md:w-36"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </>
  );
};

export default UpdateUsername;