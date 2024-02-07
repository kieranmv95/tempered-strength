import { query } from "@/db";
import { IExercise } from "@/app/api/user/exercises/route";
import React from "react";
import Link from "next/link";
import ExerciseList from './ExerciseList';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

async function getExercise(id: number) {
    const exercises = await query(`SELECT * FROM exercises WHERE id = ${id}`) as IExercise[];

    return {
        exercise: exercises[0],
    };
}

export default async function Exercise({ params }: { params: { exerciseId: string } }) {
    const { exercise } = await getExercise(Number(params.exerciseId));

    return (
        <div className="px-4 py-12 container mx-auto">
            <Link href="/exercises" className="hover:underline mb-5 block text-sm"><FontAwesomeIcon icon={faArrowLeft} /> Back to exercises</Link>
            <h2 className="text-2xl font-bold lg:text-4xl mb-6">{exercise.name}</h2>

            <ExerciseList exercise={exercise} />
        </div>
    )
}