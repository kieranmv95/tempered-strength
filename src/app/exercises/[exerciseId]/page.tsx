import { query } from "@/db";
import {IExercise, IUserExercise} from "@/app/api/user/exercises/route";
import { auth } from "@clerk/nextjs";
import React from "react";
import Link from "next/link";

async function getExercise(id: number) {
    const { userId} = auth();
    const exercises = await query(`SELECT * FROM exercises WHERE id = ${id}`) as IExercise[];
    const userExercises = await query(`SELECT * FROM userExercises WHERE userId = '${userId}' AND exerciseId = '${id}'`) as IUserExercise[];

    return {
        exercise: exercises[0],
        userExercises,
    };
}

export default async function Exercise({ params }: { params: { exerciseId: string } }) {
    const { exercise, userExercises } = await getExercise(Number(params.exerciseId));

    return (
        <div className="px-4 py-12 container mx-auto">
            <Link href="/exercises" className="hover:underline mb-5 block text-sm">← Back to exercises</Link>
            <h2 className="text-2xl font-bold lg:text-4xl mb-6">{exercise.name}</h2>
            <div className="grid grid-cols-2 gap-4 text-center mb-6 md:inline-grid md:w-[400px]">
                <div className="bg-zinc-700 rounded-sm py-6">
                    <p className="text-xl font-bold mb-2">Best</p>
                    {userExercises.reduce((a, b) => Math.max(a, Number(b.log)), -Infinity)}kg
                </div>
                <div className="bg-zinc-700 rounded-sm py-6">
                    <p className="text-xl font-bold mb-2 text-center">Latest</p>
                    {userExercises.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf())[0].log}kg
                </div>
            </div>
            <p className="text-xl font-bold mb-6">Log</p>
            <div className="grid gap-3">
                {userExercises
                    .sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf())
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
        </div>
    )
}