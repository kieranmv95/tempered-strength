import { query } from '@/db';
import { ITeam, ITeamResponse } from '@/types/ITeam';

export interface IUserTeamsClient {
  deleteAllByTeamId: (id: string) => Promise<void>;
}

class UserTeamsClientClass implements IUserTeamsClient {
  async deleteAllByTeamId(id: string) {
    await query(`DELETE FROM userTeams WHERE teamId = '${id}'`);
  }
}

const UserTeamsClient = new UserTeamsClientClass();

export default UserTeamsClient;