type ITeamBase = {
  id: number;
  name: string;
  description: string;
  ownerUserId: string;
};

export type ITeam = ITeamBase & {
  password: boolean;
};

export type ITeamResponse = ITeamBase & {
  password: string;
};

export type IUserTeam = ITeam & { owner: boolean };
