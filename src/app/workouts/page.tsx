import WorkoutsList from '@/components/WorkoutsList';
import { Container, Title } from '@/components/DesignSystemElements';
import WorkoutClient from '@/services/WorkoutsService';

async function getWorkouts() {
  return await WorkoutClient.getAll();
}

export default async function Workouts() {
  const workouts = await getWorkouts();

  return (
    <Container>
      <Title className="mb-6">WORKOUTS</Title>
      <WorkoutsList workouts={workouts} />
    </Container>
  );
}
