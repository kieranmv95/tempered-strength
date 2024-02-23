import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/db';

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } },
) {
  const sql = `SELECT * FROM users WHERE id = '${params.id}'`;

  try {
    const result = await query(sql);
    return NextResponse.json(result, { status: 200 });
  } catch (e) {
    return NextResponse.json({ err: 'users not found', e }, { status: 404 });
  }
}
