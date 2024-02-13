"use client";

import useUserExercises from "@/app/hooks/useUserExercises";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
  const { data, loading, err } = useUserExercises();

  return (
    <div className="px-4 py-12 container mx-auto">
      <h1 className="text-2xl font-bold lg:text-4xl mb-6">Dashboard</h1>

      <h2 className="text-xl font-bold">Exercises</h2>

      {loading && !err && <>Loading...</>}
      {!loading && err && <>Error</>}
      {!loading && !err && data && (
        <>
          {data.length ? (
            <>
              <p>You have logged {data.length} exercises</p>
              <Link
                className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 click:bg-red-600 py-2 px-4 rounded"
                href="/exercises"
              >
                <FontAwesomeIcon icon={faPlus} className="w-4 h-4" /> Log More
              </Link>
            </>
          ) : (
            <>
              <p>You haven&apos;t logged any exercises yet!</p>
              <Link
                className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 click:bg-red-600 py-2 px-4 rounded"
                href="/exercises"
              >
                <FontAwesomeIcon icon={faPlus} className="w-4 h-4" /> Log
                Exercises
              </Link>
            </>
          )}
        </>
      )}
    </div>
  );
}
