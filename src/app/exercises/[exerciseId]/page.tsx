import React from 'react';
import ExerciseList from './ExerciseList';
import BackButton from '@/components/BackButton';
import { Container, Title } from '@/components/DesignSystemElements';
import ExerciseClient from '@/services/ExerciseService';

async function getExercise(id: number) {
  return await ExerciseClient.getById(id);
}

export default async function Exercise({
  params,
}: {
  params: { exerciseId: string };
}) {
  const exercise = await getExercise(Number(params.exerciseId));

  if (!exercise) {
    return (
      <Container>
        <BackButton href="/exercises">Back to exercises</BackButton>
        <Title className="mb-6">EXERCISE NOT FOUND</Title>
      </Container>
    );
  }

  return (
    <Container>
      <BackButton href="/exercises">Back to exercises</BackButton>
      <Title className="mb-6">{exercise.name.toUpperCase()}</Title>
      <ExerciseList exercise={exercise} />
    </Container>
  );
}
