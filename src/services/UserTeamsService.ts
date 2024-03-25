import { query } from '@/db';

export interface IUserTeamsClient {
  post: (userId: string, teamId: string) => Promise<void>;
  deleteAllByTeamId: (id: string) => Promise<void>;
}

class UserTeamsClientClass implements IUserTeamsClient {
  async post(userId: string, teamId: string) {
    await query(
      `INSERT INTO userTeams (userId, teamId) VALUES ('${userId}', '${teamId}')`,
    );
  }

  async deleteAllByTeamId(id: string) {
    await query(`DELETE FROM userTeams WHERE teamId = '${id}'`);
  }
}

const UserTeamsClient = new UserTeamsClientClass();

export default UserTeamsClient;
