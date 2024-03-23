import ExercisesList from '@/components/ExercisesList';
import { Container, Title } from '@/components/DesignSystemElements';
import ExerciseClient from '@/services/ExerciseService';

async function getExercises() {
  return await ExerciseClient.getAll();
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
