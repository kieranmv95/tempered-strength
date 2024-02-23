import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/db';
import { auth } from '@clerk/nextjs';
import { IUser } from '@/types/IUser';

export type UpdateUserParams = {
  user: IUser;
  field: 'username' | 'weight';
};

export async function GET() {
  const { userId } = auth();
  const sql = `SELECT * FROM users WHERE id = '${userId}'`;

  try {
    const result = await query(sql);
    return NextResponse.json(result, { status: 200 });
  } catch (e) {
    return NextResponse.json({ err: 'users not found', e }, { status: 404 });
  }
}

export async function PATCH(request: NextRequest) {
  const { userId } = auth();
  const data = (await request.json()) as UpdateUserParams;
  let sql: string = '';

  if (data.field === 'username') {
    sql = `UPDATE users SET username = '${data.user.username.toLowerCase()}' WHERE id = '${userId}';`;
  }

  if (data.field === 'weight') {
    sql = `UPDATE users SET weight = ${data.user.weight} WHERE id = '${userId}';`;
  }

  try {
    await query(sql);
    return NextResponse.json(data.user, { status: 200 });
  } catch (e) {
    return NextResponse.json({ err: 'users not updated', e }, { status: 404 });
  }
}
