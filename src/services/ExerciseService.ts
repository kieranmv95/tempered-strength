import { query } from '@/db';
import { IExercise } from '@/types/IExercise';

export interface IExerciseClient {
  getAll: () => Promise<IExercise[]>;
}

class ExerciseClientClass implements IExerciseClient {
  async getAll() {
    return await query<IExercise[]>('SELECT * FROM exercises');
  }
}

const ExerciseClient = new ExerciseClientClass();

export default ExerciseClient;
