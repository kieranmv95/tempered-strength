"use client";

import { useState } from "react";
import { IExercise, IUserExercise } from "@/app/api/user/exercises/route";
import LogExerciseForm from "@/app/components/LogExerciseForm";

type ExercisesListProps = {
    exercises: IExercise[],
    userExercises: IUserExercise[]
}

const ExercisesList = ({ exercises, userExercises }: ExercisesListProps) => {
    const [selectedExercise, setSelectedExercise] = useState<IExercise | null>(null)

    const getOneRepMax = (exerciseId: number) => {
        const oneRepMax = userExercises
            .filter(userExercise => Number(userExercise.exerciseId) === exerciseId)
            .reduce((prev, curr) => Number(curr.log) > prev ? Number(curr.log) : prev, 0);

        return oneRepMax ? ` - ${oneRepMax}kg` : null;
    }

    return (
        <>
            <div className="grid gap-3">
                {exercises.map((exercise) => (
                    <button
                        key={exercise.id}
                        className={`
                            text-left
                            bg-zinc-700
                            px-4
                            py-3
                            rounded-sm
                            hover:bg-zinc-600
                            active:bg-zinc-700
                        `}
                        onClick={() => setSelectedExercise(exercise)}
                    >
                        {exercise.name}{getOneRepMax(exercise.id)}
                    </button>
                ))}
            </div>

            {selectedExercise && (
                <LogExerciseForm
                    exercise={selectedExercise}
                    setSelectedExercise={() => setSelectedExercise(null)}
                />
            )}
        </>
    )
}

export default ExercisesList;
