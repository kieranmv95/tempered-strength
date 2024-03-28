import { NextRequest, NextResponse } from 'next/server';
import UserService from '@/services/UserService';

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const result = await UserService.getUserById(params.id);

    if (!result) {
      return NextResponse.json(null, { status: 404 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (e) {
    return NextResponse.json({ err: 'users not found', e }, { status: 404 });
  }
}
