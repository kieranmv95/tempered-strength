import { query } from '@/db';
import { IUserTeam } from '@/types/ITeam';

export interface IUserTeamsClient {
  post: (userId: string, teamId: string) => Promise<void>;
  deleteAllByTeamId: (id: string) => Promise<void>;
  getByUserId: (id: string) => Promise<IUserTeam[]>;
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

  async getByUserId(id: string) {
    return await query<IUserTeam[]>(`
      SELECT teams.id, teams.name, teams.ownerUserId, teams.password
      FROM teams
      JOIN userTeams ON teams.id = userTeams.teamId
      WHERE userTeams.userId = '${id}'
      
      UNION
      
      SELECT id, name, ownerUserId, password
      FROM teams
      WHERE ownerUserId = '${id}';
    `);
  }
}

const UserTeamsClient = new UserTeamsClientClass();

export default UserTeamsClient;
