'use client'

import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from "formik";
import { IExercise } from "@/app/api/user/exercises/route";
import {useAppDispatch} from "@/lib/hooks";
import {addSuccess} from "@/lib/features/userExercises/userExercisesSlice";
import {auth, useAuth} from "@clerk/nextjs";

const ExerciseSchema = Yup.object().shape({
    log: Yup.number().required('Weight Required'),
    date: Yup.date().required('Date Required'),
});

type LogExerciseFormProps = {
    setSelectedExercise: () => void,
    exercise: IExercise,
}

const LogExerciseForm = ({ exercise, setSelectedExercise }: LogExerciseFormProps) => {
    const dispatch = useAppDispatch();
    const { userId } = useAuth();

    return (
        <>
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity pointer" />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full justify-center p-4 items-center sm:p-0">
                    <Formik
                        initialValues={{
                            log: "",
                            date: "",
                        }}
                        validationSchema={ExerciseSchema}
                        onSubmit={async (values, {setSubmitting}) => {
                            const data = {
                                exerciseId: exercise.id,
                                log: values.log,
                                date: values.date,
                            }

                            await fetch('/api/user/exercises', {
                                method: "POST",
                                body: JSON.stringify(data)
                            });

                            dispatch(addSuccess({
                                id: Math.random(),
                                exerciseId: exercise.id,
                                userId: userId || "",
                                log: values.log,
                                date: values.date,
                            }))

                            setSubmitting(false);
                            setSelectedExercise()
                        }}
                    >
                        {({isSubmitting}) => (
                            <Form className="bg-zinc-800 p-6 rounded">
                                <h2 className="text-md mb-4">{exercise.name}</h2>
                                <div className="grid gap-4">
                                    <div>
                                        <Field
                                            type="number"
                                            name="log"
                                            className="text-sm rounded block w-full p-2.5 bg-zinc-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        <ErrorMessage
                                            name="log"
                                            render={msg => <div className="text-xs text-red-600 mt-2">{msg}</div>}
                                        />
                                    </div>
                                    <div>
                                        <Field
                                            type="date"
                                            name="date"
                                            className="text-sm rounded block w-full p-2.5 bg-zinc-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        <ErrorMessage
                                            name="date"
                                            render={msg => <div className="text-xs text-red-600 mt-2">{msg}</div>}
                                        />
                                    </div>
                                    <button type="submit" disabled={isSubmitting} className="w-full block bg-blue-600 hover:bg-blue-700 click:bg-red-600 py-2 px-4 rounded">
                                        Submit
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    )
}

export default LogExerciseForm;