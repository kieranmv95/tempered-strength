import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { query } from '@/db';
import { ITeamResponse, IUserTeam } from '@/types/ITeam';

type PostParams = {
  password: string;
  team: string;
};

export async function POST(request: NextRequest) {
  const { userId } = auth();
  const data = (await request.json()) as PostParams;
  let team: ITeamResponse | null = null;

  try {
    const teamQuery = (await query(
      `SELECT * FROM teams WHERE id = ${data.team}`,
    )) as ITeamResponse[];

    team = teamQuery[0];

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

  const sql = `INSERT INTO userTeams (userId, teamId) VALUES ('${userId}', '${data.team}');`;

  try {
    await query(sql);
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
