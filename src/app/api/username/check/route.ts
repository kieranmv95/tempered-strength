import { NextRequest, NextResponse } from 'next/server';
import UserClient from '@/services/UserService';

type GetParams = {
  username: string;
};

export async function POST(request: NextRequest) {
  const data = (await request.json()) as GetParams;

  try {
    const result = UserClient.getUsersByUsername(data.username.toLowerCase());
    return NextResponse.json(result, { status: 200 });
  } catch (e) {
    return NextResponse.json({ err: 'users not created', e }, { status: 404 });
  }
}
