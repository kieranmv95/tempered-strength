import { query } from '@/db';
import { IUserExercise } from '@/types/IExercise';

export interface IUserExercisesClient {
  getById: (id: string) => Promise<IUserExercise[]>;
  post: (
    userId: string,
    exerciseId: number,
    date: Date,
    update:
      | {
          log: number;
          duration?: never;
        }
      | {
          log?: never;
          duration: string;
        },
  ) => Promise<{ insertId: number }>;
}

class UserExercisesClientClass implements IUserExercisesClient {
  async post(
    userId: string,
    exerciseId: number,
    date: Date,
    update: { log: number } | { duration: string },
  ) {
    if ('log' in update) {
      return await query<{ insertId: number }>(`
        INSERT INTO userExercises (userId, exerciseid, date, log)
        VALUES ('${userId}', ${exerciseId}, '${date}', '${update.log}');
    `);
    } else {
      return await query<{ insertId: number }>(
        `INSERT INTO userExercises (userId, exerciseid, date, duration) VALUES ('${userId}', ${exerciseId}, '${date}', '${update.duration}')`,
      );
    }
  }

  async getById(id: string) {
    return query<IUserExercise[]>(
      `SELECT * FROM userExercises WHERE userId = '${id}'`,
    );
  }
}

const UserExercisesClient = new UserExercisesClientClass();

export default UserExercisesClient;
