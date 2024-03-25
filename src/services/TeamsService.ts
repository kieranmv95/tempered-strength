import { query } from '@/db';
import { ITeam, ITeamResponse } from '@/types/ITeam';

export interface ITeamsClient {
  get: () => Promise<ITeam[]>;
  post: (
    name: string,
    description: string,
    userId: string,
    password: string,
  ) => Promise<void>;
  getById: (id: string) => Promise<ITeamResponse>;
  getIdByTeamName: (name: string) => Promise<number>;
  getUsersById: (id: string) => Promise<{ username: string; id: string }[]>;
}

class TeamsClientClass implements ITeamsClient {
  async get() {
    return await query<ITeam[]>(`SELECT * FROM teams`);
  }

  async post(
    name: string,
    description: string,
    userId: string,
    password: string,
  ) {
    await query(`
      INSERT INTO teams (name, description, ownerUserId, password)
      VALUES ('${name}', '${description}', '${userId}', '${password}');
    `);
  }

  async getById(id: string) {
    const teams = await query<ITeamResponse[]>(
      `SELECT * FROM teams WHERE id = ${id}`,
    );

    return teams[0];
  }

  async getIdByTeamName(name: string) {
    const res = await query<{ id: number }[]>(
      `SELECT id FROM teams WHERE name = '${name}'`,
    );

    return res[0].id;
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
