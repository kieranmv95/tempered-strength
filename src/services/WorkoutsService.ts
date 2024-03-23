import { query } from '@/db';
import { IWorkout } from '@/types/IWorkout';

export interface IWorkoutClient {
  getAll: () => Promise<IWorkout[]>;
}

class WorkoutClientClass implements IWorkoutClient {
  async getAll() {
    return await query<IWorkout[]>('SELECT * FROM workouts');
  }
}

const WorkoutClient = new WorkoutClientClass();

export default WorkoutClient;
