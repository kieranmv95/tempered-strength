"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import useUserExercises from "@/hooks/useUserExercises";

const Exercises = () => {
  const { data, loading, err } = useUserExercises();

  return (
    <div className="bg-zinc-700 p-4">
      <h2 className="text-xl font-bold mb-3">Exercises</h2>
      <p className="mb-3">Log and track all your exercises in one place</p>
      <div>
        {loading && !err && <div className="mb-3">Loading...</div>}
        {!loading && err && <div className="mb-3">Error</div>}
        {!loading && !err && data && (
          <>
            {data.length ? (
              <p className="mb-3">You have logged {data.length} exercises</p>
            ) : (
              <p className="mb-3">You haven&apos;t logged any exercises yet!</p>
            )}
          </>
        )}
      </div>

      <Link
        className="inline-block bg-blue-600 hover:bg-blue-700 click:bg-red-600 py-2 px-4 rounded"
        href="/exercises"
      >
        Log More
      </Link>
    </div>
  );
};

export default Exercises;
