"use client";

import {useEffect, useState} from "react";
import { IExercise } from "@/app/api/user/exercises/route";
import LogExerciseForm from "@/app/components/LogExerciseForm";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {addSuccess, fetchSuccess} from "@/lib/features/userExercises/userExercisesSlice";

type ExercisesListProps = {
    exercises: IExercise[]
}

const ExercisesList = ({ exercises }: ExercisesListProps) => {
    const [selectedExercise, setSelectedExercise] = useState<IExercise | null>(null)
    const userExercises = useAppSelector((state) => state.exercises.data);
    const dispatch = useAppDispatch();

    useEffect(() => {
        (async () => {
            if(!userExercises) {
                const res = await fetch('/api/user/exercises');
                const json = await res.json();

                dispatch(fetchSuccess(json))
            }
        })();
    }, [userExercises, dispatch]);

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
                    <button
                        key={exercise.id}
                        className={`
                            text-left
                            bg-zinc-700
                            px-4
                            py-2
                            rounded-sm
                            hover:bg-zinc-600
                            active:bg-zinc-700
                            flex
                            justify-between
                            items-center
                        `}
                        onClick={() => setSelectedExercise(exercise)}
                    >
                        <div>{exercise.name}</div>
                        {getOneRepMax(exercise.id)}
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
