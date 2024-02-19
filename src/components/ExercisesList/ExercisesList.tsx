"use client";

import { useState } from "react";
import { IExercise } from "@/app/api/user/exercises/route";
import LogExerciseForm from "../LogExerciseModal";
import useUserExercises from "@/hooks/useUserExercises";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { getUnits } from "@/helpers/units";

type ExercisesListProps = {
  exercises: IExercise[];
};

const ExercisesList = ({ exercises }: ExercisesListProps) => {
  const [selectedExercise, setSelectedExercise] = useState<IExercise | null>(
    null,
  );
  const { loading, err, getOneRepMax } = useUserExercises();

  if (loading && !err) return <>Loading...</>;
  if (!loading && err) return <>Error</>;

  return (
    <>
      <div className="grid gap-3">
        {exercises
          .sort((a, b) => {
            return a.name.localeCompare(b.name);
          })
          .map((exercise) => {
            const oneRepMax = getOneRepMax(exercise.id);

            return (
              <div
                key={exercise.id}
                className="grid grid-cols-[1fr_auto] justify-between items-center gap-2"
              >
                <div className="bg-zinc-700 px-3 rounded-sm flex justify-between h-11 items-center">
                  <p>{exercise.name}</p>
                  {oneRepMax && (
                    <p className="font-bold">
                      {oneRepMax}
                      {getUnits(exercise.logging_type)}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <div
                    onClick={() => setSelectedExercise(exercise)}
                    className="cursor-pointer bg-green-600 hover:bg-green-700 text-white rounded-sm h-11 w-11 flex items-center justify-center"
                  >
                    <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
                  </div>
                  <Link
                    href={`/exercises/${exercise.id}`}
                    className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded-sm h-11 w-11 flex items-center justify-center"
                  >
                    <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
      </div>

      {selectedExercise && (
        <LogExerciseForm
          exercise={selectedExercise}
          close={() => setSelectedExercise(null)}
        />
      )}
    </>
  );
};

export default ExercisesList;