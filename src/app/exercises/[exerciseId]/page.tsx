import { query } from "@/db";
import { IExercise } from "@/app/api/user/exercises/route";
import React from "react";
import ExerciseList from "./ExerciseList";
import BackButton from "@/app/components/BackButton";

async function getExercise(id: number) {
  const exercises = (await query(
    `SELECT * FROM exercises WHERE id = ${id}`,
  )) as IExercise[];

  return {
    exercise: exercises[0],
  };
}

export default async function Exercise({
  params,
}: {
  params: { exerciseId: string };
}) {
  const { exercise } = await getExercise(Number(params.exerciseId));

  return (
    <div className="px-4 py-12 container mx-auto">
      <BackButton href="/exercises">Back to exercises</BackButton>
      <h2 className="text-2xl font-bold lg:text-4xl mb-6">{exercise.name}</h2>

      <ExerciseList exercise={exercise} />
    </div>
  );
}
