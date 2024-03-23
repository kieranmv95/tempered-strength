import { query } from '@/db';
import { ILoggingType } from '@/types/IExercise';
import { IUser } from '@/types/IUser';

export interface IUserClient {
  getUserPublicProfile: (username: string) => Promise<
    {
      log: string;
      date: Date;
      name: string;
      logging_type: ILoggingType;
    }[]
  >;
  getUsernameByUserId: (userId: string) => Promise<string | null>;
  getUsersByUsername: (username: string) => Promise<IUser[]>;
  getUserById: (userId: string) => Promise<IUser>;
}

class UserClientClass implements IUserClient {
  async getUserPublicProfile(username: string) {
    const userprofileData = await query<
      {
        log: string;
        date: Date;
        name: string;
        logging_type: ILoggingType;
      }[]
    >(`
      SELECT ue.log, ue.date, e.name, e.logging_type
      FROM (
          SELECT userId, exerciseId, MAX(log) as MaxLog
          FROM userExercises
          GROUP BY userId, exerciseId
      ) as max_ue
      JOIN userExercises ue ON max_ue.userId = ue.userId AND max_ue.exerciseId = ue.exerciseId AND max_ue.MaxLog = ue.log
      JOIN users u ON ue.userId = u.id
      JOIN exercises e ON ue.exerciseId = e.id
      WHERE u.username = '${username}' AND e.public = 1;
  `);

    if (!userprofileData.length) {
      return [];
    } else {
      return userprofileData;
    }
  }

  async getUsernameByUserId(userId: string) {
    const user = await query<
      {
        username: string;
      }[]
    >(`SELECT username FROM users WHERE id = '${userId}';`);

    if (!user.length) {
      return null;
    } else {
      return user[0].username;
    }
  }

  async getUsersByUsername(username: string) {
    return await query<IUser[]>(
      `SELECT * FROM users WHERE username = '${username}'`,
    );
  }

  async getUserById(userId: string) {
    const users = await query<IUser[]>(
      `SELECT * FROM users WHERE id = '${userId}'`,
    );
    return users[0];
  }
}

const UserClient = new UserClientClass();

export default UserClient;
