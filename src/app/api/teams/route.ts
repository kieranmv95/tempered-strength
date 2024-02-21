import { query } from '@/db';
import { NextRequest, NextResponse } from 'next/server';
import { ITeam } from '@/types/Team';
import { auth } from '@clerk/nextjs';

export async function GET() {
  const sql = `SELECT * FROM teams`;

  try {
    const result = (await query(sql)) as ITeam[];
    const sanitisedPasswordsResult = result.map(team => ({
      ...team,
      password: !!(team.password as unknown as string).length,
    }));

    return NextResponse.json(sanitisedPasswordsResult, { status: 200 });
  } catch (e) {
    return NextResponse.json({ err: 'Teams not found', e }, { status: 404 });
  }
}

type PostParams = {
  name: string;
  description: string;
  password: string;
};

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
    const res = (await query(selectSql)) as { id: number }[];
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
