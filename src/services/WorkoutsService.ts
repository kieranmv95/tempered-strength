import { query } from '@/db';
import { IWorkout } from '@/types/IWorkout';

export interface IWorkoutClient {
  getAll: () => Promise<IWorkout[]>;
  getById: (id: number) => Promise<IWorkout>;
}

class WorkoutClientClass implements IWorkoutClient {
  async getAll() {
    return await query<IWorkout[]>('SELECT * FROM workouts');
  }

  async getById(id: number) {
    const workouts = await query<IWorkout[]>(
      `SELECT * FROM workouts WHERE id = ${id}`,
    );

    return workouts[0];
  }
}

const WorkoutClient = new WorkoutClientClass();

export default WorkoutClient;
