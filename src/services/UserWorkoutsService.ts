import { query } from '@/db';
import { IUserWorkout } from '@/types/IWorkout';

export interface IUserWorkoutClient {
  post: (
    userId: string,
    workoutId: number,
    log: string,
    date: string,
  ) => Promise<{ insertId: number }>;
  getByUserId: (userId: string) => Promise<IUserWorkout[]>;
  deleteById: (id: number) => Promise<void>;
}

class UserWorkoutClientClass implements IUserWorkoutClient {
  async post(userId: string, workoutId: number, log: string, date: string) {
    return await query<{ insertId: number }>(`
        INSERT INTO userWorkouts (userId, workoutId, log, date)
        VALUES ('${userId}', ${workoutId}, '${log}', '${date}');
      `);
  }

  async getByUserId(userId: string) {
    return await query<IUserWorkout[]>(
      `SELECT * FROM userWorkouts WHERE userId = '${userId}'`,
    );
  }

  async deleteById(id: number) {
    await query(`DELETE FROM userWorkouts WHERE id = ${Number(id)}`);
  }
}

const UserWorkoutClient = new UserWorkoutClientClass();

export default UserWorkoutClient;
