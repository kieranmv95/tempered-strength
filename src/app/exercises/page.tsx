import { query } from "@/db";
import ExercisesList from "@/app/components/ExercisesList";
import { IExercise, IUserExercise } from "@/app/api/user/exercises/route";
import { auth } from "@clerk/nextjs";

async function getData() {
    const { userId }= auth();
    const exercises = await query("SELECT * FROM exercises") as IExercise[];
    const userExercises = await query(`SELECT * FROM userExercises WHERE userId = '${userId}'`) as IUserExercise[];

    return {
        exercises,
        userExercises,
    }
}


export default async function Exercises() {
    const { exercises, userExercises } = await getData();

    return (
        <div className="px-4 py-8 container mx-auto">
            <h1 className="text-xl mb-4">Exercise</h1>

            <ExercisesList exercises={exercises} userExercises={userExercises}/>
        </div>
    )
}