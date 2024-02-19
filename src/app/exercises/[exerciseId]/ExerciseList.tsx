"use client";

import React, { useState } from "react";
import useUserExercises from "@/hooks/useUserExercises";
import { IExercise } from "@/app/api/user/exercises/route";
import LogExerciseForm from "@/components/LogExerciseModal";
import ExerciseListItem from "@/app/exercises/[exerciseId]/ExerciseListItem";
import { removeSuccess } from "@/lib/features/userExercises/userExercisesSlice";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/lib/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { getUnits } from "@/helpers/units";
import PercentagesBreakdown from "@/components/PercentagesBreakdown";

const ExerciseList = ({ exercise }: { exercise: IExercise }) => {
  const [selectedExercise, setSelectedExercise] = useState<IExercise | null>(
    null,
  );
  const [breakdownPb, setBreakdownPb] = useState(true);

  const { data, loading, err, getExerciseById } = useUserExercises();
  const dispatch = useAppDispatch();

  const deleteExercise = async (id: number) => {
    await fetch("/api/user/exercises", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });

    dispatch(removeSuccess({ id }));

    toast.success("Exercise Removed");
  };

  return (
    <>
      {loading && !err && <>Loading...</>}
      {!loading && err && <>Error</>}
      {!loading && !err && data && (
        <>
          {getExerciseById(exercise.id).length ? (
            <>
              <div className="grid grid-cols-2 gap-4 text-center mb-6 md:inline-grid md:w-[400px]">
                <div className="bg-zinc-700 rounded-sm py-6">
                  <p className="text-xl font-bold mb-2">Best</p>
                  {getExerciseById(exercise.id).reduce((a, b) => {
                    return Math.max(a, b.log);
                  }, -Infinity)}
                  {getUnits(exercise.logging_type)}
                </div>
                <div className="bg-zinc-700 rounded-sm py-6">
                  <p className="text-xl font-bold mb-2 text-center">Latest</p>
                  {getExerciseById(exercise.id)[0].log}
                  {getUnits(exercise.logging_type)}
                </div>
              </div>
              <p className="text-xl font-bold mb-2">Percentages Breakdown</p>
              <div className="flex gap-3 mb-2">
                <button
                  className={`block py-2 px-4 rounded ${breakdownPb ? "bg-blue-600 hover:bg-blue-600" : "bg-blue-400 hover:bg-blue-500"}`}
                  onClick={() => setBreakdownPb(true)}
                >
                  Best
                </button>
                <button
                  className={`block py-2 px-4 rounded ${!breakdownPb ? "bg-blue-600 hover:bg-blue-600" : "bg-blue-400 hover:bg-blue-500"}`}
                  onClick={() => setBreakdownPb(false)}
                >
                  Latest
                </button>
              </div>

              <div className="mb-6">
                <PercentagesBreakdown
                  value={
                    breakdownPb
                      ? getExerciseById(exercise.id).reduce((a, b) => {
                          return Math.max(a, b.log);
                        }, -Infinity)
                      : getExerciseById(exercise.id)[0].log
                  }
                  loggingType={exercise.logging_type}
                />
              </div>
              <p className="text-xl font-bold mb-2">Log</p>
              <button
                className="block bg-green-600 hover:bg-green-700 py-2 px-4 rounded mb-4"
                onClick={() => setSelectedExercise(exercise)}
              >
                Log <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
              </button>
              <div className="grid gap-3">
                {getExerciseById(exercise.id).map((userExercise) => {
                  return (
                    <ExerciseListItem
                      key={userExercise.id}
                      exercise={exercise}
                      userExercise={userExercise}
                      deleteExercise={(id) => deleteExercise(id)}
                    />
                  );
                })}
              </div>
            </>
          ) : (
            <div>
              <button
                className="block bg-green-600 hover:bg-green-700 py-2 px-4 rounded mt-2"
                onClick={() => setSelectedExercise(exercise)}
              >
                Log your first {exercise.name}{" "}
                <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      )}
      {selectedExercise && (
        <LogExerciseForm
          exercise={selectedExercise}
          close={() => setSelectedExercise(null)}
        />
      )}
    </>
  );
};

export default ExerciseList;
