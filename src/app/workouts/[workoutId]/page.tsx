import React from 'react';
import BackButton from '@/components/BackButton';
import { query } from '@/db';
import { IWorkout } from '@/types/IWorkout';
import WorkoutList from './WorkoutList';

async function getWorkouts(id: number) {
  const workouts = (await query(
    `SELECT * FROM workouts WHERE id = ${id}`,
  )) as IWorkout[];

  return workouts[0];
}

export default async function Workout({
  params,
}: {
  params: { workoutId: string };
}) {
  const workout = await getWorkouts(Number(params.workoutId));

  if (!workout) return null;

  return (
    <div className="px-4 py-12 container mx-auto">
      <BackButton href="/workouts">Back to workouts</BackButton>
      <div className="text-sm">{workout.workout_type}</div>
      <h2 className="text-2xl font-bold lg:text-4xl mb-6">{workout.name}</h2>
      <div dangerouslySetInnerHTML={{ __html: workout.description }} />
      <WorkoutList workout={workout} />
    </div>
  );
}
