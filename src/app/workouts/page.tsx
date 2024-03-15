import WorkoutsList from '@/components/WorkoutsList';
import { query } from '@/db';
import { IWorkout } from '@/types/IWorkout';
import { Container, Title } from '@/components/DesignSystemElements';

async function getWorkouts() {
  return (await query('SELECT * FROM workouts')) as IWorkout[];
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
