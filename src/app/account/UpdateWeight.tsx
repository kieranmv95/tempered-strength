'use client';

import { useEffect, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useAppDispatch } from '@/lib/hooks';
import { updateWeight } from '@/lib/features/user/userSlice';
import { UpdateUserParams } from '@/app/api/user/update/route';
import { IUser } from '@/types/IUser';
import { Button } from '@/components';

const WeightSchema = Yup.object().shape({
  weight: Yup.number(),
});

type UpdateWeightProps = {
  user: IUser;
};

const UpdateWeight = ({ user }: UpdateWeightProps) => {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const dispatch = useAppDispatch();
  const showForm = () => {
    setShowUpdateForm(true);
  };

  useEffect(() => {
    if (showUpdateForm) {
      document.getElementById('weight')?.focus();
    }
  }, [showUpdateForm]);

  return (
    <>
      <div>
        {!showUpdateForm ? (
          <>
            <p className="mb-1">Weight (kg)</p>
            <p className="mb-2 text-sm">
              Your weight will never be shared publicly
            </p>
            <div
              className="rounded block w-full p-2.5 bg-zinc-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 mt-2"
              onClick={showForm}
            >
              {user.weight || 'Click to add weight'}
            </div>
          </>
        ) : (
          <Formik
            initialValues={{
              weight: user.weight || '',
            }}
            enableReinitialize={true}
            onSubmit={async (values, { setSubmitting }) => {
              if (user.weight === values.weight) {
                toast.success('Weight updated');
                setShowUpdateForm(false);
              } else {
                const weight = values.weight ? Number(values.weight) : null;

                const userChanges: UpdateUserParams = {
                  field: 'weight',
                  user: {
                    ...user,
                    weight: weight,
                  },
                };

                await fetch('/api/user/update', {
                  method: 'POST',
                  body: JSON.stringify(userChanges),
                });

                dispatch(updateWeight(weight));

                setSubmitting(false);
                toast.success('Weight Updated');
                setShowUpdateForm(false);
              }
            }}
            validationSchema={WeightSchema}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="grid gap-4">
                  <div>
                    <label className="block mb-1" htmlFor="date">
                      Weight (kg)
                    </label>
                    <p className="mb-2 text-sm">
                      Your weight will never be shared publicly
                    </p>
                    <Field
                      id="weight"
                      type="text"
                      name="weight"
                      inputMode="numeric"
                      placeholder="80kg"
                      className="rounded block w-full p-2.5 bg-zinc-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 mt-2"
                    />
                    <ErrorMessage
                      name="weight"
                      render={msg => (
                        <div className="text-xs text-red-400 mt-2">{msg}</div>
                      )}
                    />
                    <div className="flex gap-4">
                      <Button
                        type="button"
                        theme="red"
                        onClick={() => setShowUpdateForm(false)}
                        className="w-full mt-3 md:w-36"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="w-full mt-3 md:w-36"
                        disabled={isSubmitting}
                        loading={isSubmitting}
                        loadingText="Updating"
                      >
                        Update
                      </Button>
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

export default UpdateWeight;
