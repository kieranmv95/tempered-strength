import { query } from '@/db';
import { ILoggingType } from '@/types/IExercise';

export type IUserStats = {
  log: string;
  date: Date;
  name: string;
  logging_type: ILoggingType;
  username: string;
  weight: number;
};

export interface IUserComparisonClient {
  compare: (userOne: string, userTwo: string) => Promise<IUserStats[]>;
}

class UserComparisonClientClass implements IUserComparisonClient {
  async compare(userOne: string, userTwo: string) {
    return await query<IUserStats[]>(`
      SELECT ue.log, ue.date, e.name, e.logging_type, u.username, u.weight
      FROM (
          SELECT userId, exerciseId, MAX(log) as MaxLog
          FROM userExercises
          GROUP BY userId, exerciseId
      ) as max_ue
      JOIN userExercises ue ON max_ue.userId = ue.userId AND max_ue.exerciseId = ue.exerciseId AND max_ue.MaxLog = ue.log
      JOIN users u ON ue.userId = u.id
      JOIN exercises e ON ue.exerciseId = e.id
      WHERE u.username = '${userOne}' OR u.username = '${userTwo}' AND e.public = 1;
  `);
  }
}

const UserComparisonClient = new UserComparisonClientClass();

export default UserComparisonClient;
