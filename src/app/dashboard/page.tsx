"use client"

import useUserExercises from "@/app/hooks/useUserExercises";
import Link from "next/link";

export default function Dashboard() {
    const [userExercises] = useUserExercises();

    return (
        <div className="px-4 py-12 container mx-auto lg:py-24">
            <h2 className="text-2xl font-bold lg:text-4xl mb-6">DASHBOARD</h2>

            <h2 className="text-xl font-bold">Exercises</h2>
            {!!userExercises ? (
                <>
                    <p>You have logged {userExercises.length} exercises</p>
                    <Link className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 click:bg-red-600 py-2 px-4 rounded" href="/exercises">Log More</Link>
                </>
            ) : (
                <>
                <p>You haven&apos;t logged any exercises yet!</p>
                    <Link className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 click:bg-red-600 py-2 px-4 rounded" href="/exercises">Log Exercises</Link>
                </>
            )}
        </div>
    )
}
