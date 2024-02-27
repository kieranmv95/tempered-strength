import WorkoutsList from '@/components/WorkoutsList';
import { query } from '@/db';
import { IWorkout } from '@/types/IWorkout';

async function getWorkouts() {
  return (await query('SELECT * FROM workouts')) as IWorkout[];
}

export default async function Workouts() {
  const workouts = await getWorkouts();

  return (
    <div className="px-4 py-12 container mx-auto">
      <h2 className="text-2xl font-bold lg:text-4xl mb-6">Workouts</h2>

      <WorkoutsList workouts={workouts} />
    </div>
  );
}
