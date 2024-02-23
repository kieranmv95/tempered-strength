import { NextResponse } from 'next/server';
import { query } from '@/db';
import { auth } from '@clerk/nextjs';

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
