import { query } from '@/db';
import { NextRequest, NextResponse } from 'next/server';
import { ITeam } from '@/types/ITeam';
import { auth } from '@clerk/nextjs';

type PostParams = {
  name: string;
  description: string;
  password: string;
};

type DeleteParams = {
  id: string;
};

export async function GET() {
  const sql = `SELECT * FROM teams`;

  try {
    const result = await query<ITeam[]>(sql);
    const sanitisedPasswordsResult = result.map(team => ({
      ...team,
      password: !!(team.password as unknown as string).length,
    }));

    return NextResponse.json(sanitisedPasswordsResult, { status: 200 });
  } catch (e) {
    return NextResponse.json({ err: 'Teams not found', e }, { status: 404 });
  }
}

export async function POST(request: NextRequest) {
  const { userId } = auth();
  const { name, description, password } = (await request.json()) as PostParams;

  const insertSql = `
    INSERT INTO teams (name, description, ownerUserId, password)
    VALUES ('${name}', '${description}', '${userId}', '${password}');
  `;

  const selectSql = `SELECT id FROM teams WHERE name = '${name}' ;`;

  try {
    await query(insertSql);
    const res = await query<{ id: number }[]>(selectSql);
    const createdId = res[0].id;

    return NextResponse.json(
      {
        id: createdId,
        name,
        description,
        ownerUserId: userId,
        password: !!password.length,
        owner: true,
      },
      { status: 200 },
    );
  } catch (e: any) {
    if (e.code) {
      return NextResponse.json(
        { err: 'Team name already exists', e },
        { status: 404 },
      );
    }

    return NextResponse.json({ err: 'teams not created', e }, { status: 404 });
  }
}

export async function DELETE(request: NextRequest) {
  const { id } = (await request.json()) as DeleteParams;

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
