import React from 'react';
import BackButton from '@/components/BackButton';
import WorkoutList from './WorkoutList';
import { Container, Title } from '@/components/DesignSystemElements';
import WorkoutClient from '@/services/WorkoutsService';

async function getWorkouts(id: number) {
  return await WorkoutClient.getById(id);
}

export default async function Workout({
  params,
}: {
  params: { workoutId: string };
}) {
  const workout = await getWorkouts(Number(params.workoutId));

  if (!workout) {
    return (
      <Container>
        <BackButton href="/workouts">Back to workouts</BackButton>
        <Title className="mb-6">WORKOUT NOT FOUND</Title>
      </Container>
    );
  }

  return (
    <Container>
      <BackButton href="/workouts">Back to workouts</BackButton>
      <div className="text-sm">{workout.workout_type}</div>
      <Title className="mb-6">{workout.name.toUpperCase()}</Title>
      <WorkoutList workout={workout} />
    </Container>
  );
}
