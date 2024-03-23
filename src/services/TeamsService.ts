import { query } from '@/db';
import { ITeamResponse } from '@/types/ITeam';

export interface ITeamsClient {
  getById: (id: string) => Promise<ITeamResponse>;
  getUsersById: (id: string) => Promise<{ username: string; id: string }[]>;
}

class TeamsClientClass implements ITeamsClient {
  async getById(id: string) {
    const teams = await query<ITeamResponse[]>(
      `SELECT * FROM teams WHERE id = ${id}`,
    );

    return teams[0];
  }

  async getUsersById(id: string) {
    return await query<{ username: string; id: string }[]>(`
      SELECT u.username, u.id
      FROM users u
      JOIN teams t ON u.id = t.ownerUserId
      WHERE t.id = '${id}'
    
      UNION
    
      SELECT u.username, u.id
      FROM users u
      JOIN userTeams ut ON u.id = ut.userId
      WHERE ut.teamId = '${id}';
    `);
  }
}

const TeamsClient = new TeamsClientClass();

export default TeamsClient;
