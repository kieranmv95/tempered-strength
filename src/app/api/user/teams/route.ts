import { query } from '@/db';
import { NextResponse } from 'next/server';
import { IUserTeam } from '@/types/ITeam';
import { auth } from '@clerk/nextjs';

export async function GET() {
  const { userId } = auth();

  const sql = `
    SELECT teams.id, teams.name, teams.ownerUserId, teams.password
    FROM teams
    JOIN userTeams ON teams.id = userTeams.teamId
    WHERE userTeams.userId = '${userId}'
    
    UNION
    
    SELECT id, name, ownerUserId, password
    FROM teams
    WHERE ownerUserId = '${userId}';
  `;

  try {
    const result = (await query(sql)) as IUserTeam[];
    const sanitisedPasswordsResult = result.map(team => ({
      ...team,
      password: !!(team.password as unknown as string).length,
      owner: team.ownerUserId === userId,
    }));
    return NextResponse.json(sanitisedPasswordsResult, { status: 200 });
  } catch (e) {
    return NextResponse.json({ err: 'Teams not found', e }, { status: 404 });
  }
}
