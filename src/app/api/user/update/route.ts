import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { query } from '@/db';
import { IUser } from '@/types/IUser';

export type UpdateUserParams = {
  user: IUser;
  field: 'username' | 'weight';
};

export async function POST(request: NextRequest) {
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
