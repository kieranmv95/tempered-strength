import { query } from "@/db";
import ExercisesList from "@/app/components/ExercisesList";
import { IExercise } from "@/app/api/user/exercises/route";

async function getExercises() {
    return await query("SELECT * FROM exercises") as IExercise[]
}

export default async function Exercises() {
    const exercises = await getExercises();

    return (
        <div className="px-4 py-12 container mx-auto">
            <h2 className="text-2xl font-bold lg:text-4xl mb-6">EXERCISES</h2>

            <ExercisesList exercises={exercises}/>
        </div>
    )
}