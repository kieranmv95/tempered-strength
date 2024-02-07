"use client"

import React from "react";
import useUserExercises from "@/app/hooks/useUserExercises";
import { IExercise } from "@/app/api/user/exercises/route";

const ExerciseList = ({ exercise }: { exercise: IExercise }) => {
    const { data, loading, err, getExerciseById} = useUserExercises();

    return (
        <>
            {(loading && !err) && (
                <>Loading...</>
            )}
            {(!loading && err) && (
                <>Error</>
            )}
            {(!loading && !err && data) && (
                <>
                    {getExerciseById(exercise.id).length ? (
                        <>
                            <div className="grid grid-cols-2 gap-4 text-center mb-6 md:inline-grid md:w-[400px]">
                                <div className="bg-zinc-700 rounded-sm py-6">
                                    <p className="text-xl font-bold mb-2">Best</p>
                                    {getExerciseById(exercise.id).reduce((a, b) => Math.max(a, Number(b.log)), -Infinity)}kg
                                </div>
                                <div className="bg-zinc-700 rounded-sm py-6">
                                    <p className="text-xl font-bold mb-2 text-center">Latest</p>
                                    {getExerciseById(exercise.id)[0].log}kg
                                </div>
                            </div>
                            <p className="text-xl font-bold mb-6">Log</p>
                            <div className="grid gap-3">
                                {getExerciseById(exercise.id)
                                    .map((userExercise) => (
                                        <div
                                            key={userExercise.id}
                                            className={`
                                                bg-zinc-700
                                                px-3
                                                py-2
                                                rounded-sm
                                                flex
                                                justify-between
                                            `}
                                        >
                                            <div>{new Date(userExercise.date).toLocaleDateString('en-GB')}</div>
                                            <div>{userExercise.log}kg</div>
                                        </div>
                                    ))}
                            </div>
                        </>
                    ) : (
                        <div>
                            No {exercise.name} bests logged, go back to the exercise page to log!<br /><br />Ability to log workouts soon coming to this page
                        </div>
                    )}
                </>
            )}
        </>
    )
}

export default ExerciseList;