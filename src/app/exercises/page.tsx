import { query } from '@/db';
import ExercisesList from '@/components/ExercisesList';
import { IExercise } from '@/types/IExercise';
import { Container, Title } from '@/components/DesignSystemElements';

async function getExercises() {
  return (await query('SELECT * FROM exercises')) as IExercise[];
}

export default async function Exercises() {
  const exercises = await getExercises();

  return (
    <Container>
      <Title className="mb-6">EXERCISES</Title>
      <ExercisesList exercises={exercises} />
    </Container>
  );
}
