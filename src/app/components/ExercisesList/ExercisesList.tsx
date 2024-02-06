"use client";

import { useState} from "react";
import { IExercise } from "@/app/api/user/exercises/route";
import LogExerciseForm from "@/app/components/LogExerciseForm";
import useUserExercises from "@/app/hooks/useUserExercises";
import Link from "next/link";

type ExercisesListProps = {
    exercises: IExercise[]
}

const ExercisesList = ({ exercises }: ExercisesListProps) => {
    const [selectedExercise, setSelectedExercise] = useState<IExercise | null>(null)
    const { userExercises } = useUserExercises();


    const getOneRepMax = (exerciseId: number) => {
        const oneRepMax = userExercises
            ?.filter(userExercise => Number(userExercise.exerciseId) === exerciseId)
            .reduce((prev, curr) => Number(curr.log) > prev ? Number(curr.log) : prev, 0);

        return oneRepMax ? <div className="bg-amber-400 text-zinc-900 px-2 py-1 rounded-sm">{oneRepMax}kg</div> : null;
    }

    return (
        <>
            <div className="grid gap-3">
                {exercises.map((exercise) => (
                    <div
                        key={exercise.id}
                        className={`
                            text-left
                            bg-zinc-700
                            px-3
                            rounded-sm
                            flex
                            justify-between
                            items-center
                        `}
                    >
                        <div className="py-3">{exercise.name}</div>
                        <div className="flex gap-3">
                            {getOneRepMax(exercise.id)}
                            <div onClick={() => setSelectedExercise(exercise)}
                                 className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-sm">+
                            </div>
                            <Link href={`/exercises/${exercise.id}`} className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-sm">→</Link>
                        </div>
                    </div>
                ))}
            </div>

            {selectedExercise && (
                <LogExerciseForm
                    exercise={selectedExercise}
                    close={() => setSelectedExercise(null)}
                />
            )}
        </>
    )
}

export default ExercisesList;
