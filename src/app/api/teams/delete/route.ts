import { query } from '@/db';
import { NextRequest, NextResponse } from 'next/server';
import { ITeam } from '@/types/Team';
import { auth } from '@clerk/nextjs';

type PostParams = {
  id: string;
};

export async function POST(request: NextRequest) {
  const { id } = (await request.json()) as PostParams;

  const deleteTeamSql = `DELETE FROM teams WHERE id = '${id}'`;
  const deleteUserTeams = `DELETE FROM userTeams WHERE teamId = '${id}'`;

  try {
    await query(deleteTeamSql);
    await query(deleteUserTeams);

    return NextResponse.json({ id: id }, { status: 200 });
  } catch (e: any) {
    if (e.code) {
      return NextResponse.json({ err: 'team not deleted', e }, { status: 404 });
    }

    return NextResponse.json({ err: 'team not deleted', e }, { status: 404 });
  }
}
