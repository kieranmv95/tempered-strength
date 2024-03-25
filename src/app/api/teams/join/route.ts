import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { ITeamResponse, IUserTeam } from '@/types/ITeam';
import TeamsService from '@/services/TeamsService';
import UserTeamsService from '@/services/UserTeamsService';

type PostParams = {
  password: string;
  team: string;
};

export async function POST(request: NextRequest) {
  const { userId } = auth();
  const data = (await request.json()) as PostParams;
  let team: ITeamResponse | null = null;

  if (!userId) {
    return NextResponse.json({ err: 'user not found' }, { status: 404 });
  }

  try {
    team = await TeamsService.getById(data.team);

    const teamPassword = team.password;

    if (teamPassword.length && teamPassword !== data.password) {
      return NextResponse.json({ err: 'password incorrect' }, { status: 401 });
    }
  } catch {
    return NextResponse.json(
      { err: 'password incorrect error' },
      { status: 401 },
    );
  }

  try {
    await UserTeamsService.post(userId, data.team);

    return NextResponse.json(
      {
        ...team,
        password: !!team.password,
        owner: false,
      } as IUserTeam,
      {
        status: 200,
      },
    );
  } catch (e) {
    return NextResponse.json({ err: 'error joining team', e }, { status: 400 });
  }
}
