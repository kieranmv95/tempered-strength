import { query } from "@/db";
import ExercisesList from "@/app/components/ExercisesList";
import {IExercise, IUserExercise} from "@/app/api/user/exercises/route";
import { auth } from "@clerk/nextjs";

async function getExercises() {
    return await query("SELECT * FROM exercises") as IExercise[]
}

export default async function Exercises() {
    const exercises = await getExercises();

    return (
        <div className="px-4 py-8 container mx-auto">
            <h1 className="text-xl mb-4">Exercise</h1>

            <ExercisesList exercises={exercises} />
        </div>
    )
}