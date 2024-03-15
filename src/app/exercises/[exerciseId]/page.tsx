import { query } from '@/db';
import React from 'react';
import ExerciseList from './ExerciseList';
import BackButton from '@/components/BackButton';
import { IExercise } from '@/types/IExercise';
import { Container, Title } from '@/components/DesignSystemElements';

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
    <Container>
      <BackButton href="/exercises">Back to exercises</BackButton>
      <Title className="mb-6">{exercise.name.toUpperCase()}</Title>
      <ExerciseList exercise={exercise} />
    </Container>
  );
}
