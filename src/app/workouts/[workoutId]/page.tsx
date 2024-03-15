import React from 'react';
import BackButton from '@/components/BackButton';
import { query } from '@/db';
import { IWorkout } from '@/types/IWorkout';
import WorkoutList from './WorkoutList';
import { Container, Title } from '@/components/DesignSystemElements';

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
    <Container>
      <BackButton href="/workouts">Back to workouts</BackButton>
      <div className="text-sm">{workout.workout_type}</div>
      <Title className="mb-6">{workout.name.toUpperCase()}</Title>
      <WorkoutList workout={workout} />
    </Container>
  );
}
