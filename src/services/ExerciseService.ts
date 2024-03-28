import { query } from '@/db';
import { IExercise } from '@/types/IExercise';

export interface IExerciseClient {
  getAll: () => Promise<IExercise[]>;
  getById: (id: number) => Promise<IExercise>;
  deleteById: (id: number) => Promise<number>;
}

class ExerciseClientClass implements IExerciseClient {
  async getAll() {
    return await query<IExercise[]>('SELECT * FROM exercises');
  }
  async getById(id: number) {
    const exercises = await query<IExercise[]>(
      `SELECT * FROM exercises WHERE id = ${id}`,
    );

    return exercises[0];
  }

  async deleteById(id: number) {
    await query(`DELETE FROM userExercises WHERE id = ${Number(id)}`);
    return id;
  }
}

const ExerciseClient = new ExerciseClientClass();

export default ExerciseClient;
