import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { IUser } from '@/types/IUser';
import UserClient from '@/services/UserService';
import UserService from '@/services/UserService';

export type UpdateUserParams = {
  user: IUser;
  field: 'username' | 'weight';
};

type PostParams = {
  username: string;
};

export async function GET() {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ err: 'user not found' }, { status: 404 });
  }

  try {
    const user = await UserClient.getUserById(userId);

    if (!user) {
      NextResponse.json({ err: 'user not found' }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (e) {
    return NextResponse.json({ err: 'user not found' }, { status: 404 });
  }
}

export async function PATCH(request: NextRequest) {
  const { userId } = auth();
  const data = (await request.json()) as UpdateUserParams;

  if (!userId) {
    return NextResponse.json({ err: 'user not found' }, { status: 404 });
  }

  try {
    if (data.field === 'username') {
      await UserClient.updateFieldByUserId(
        data.field,
        data.user.username.toLowerCase(),
        userId,
      );
    }

    if (data.field === 'weight') {
      await UserClient.updateFieldByUserId(
        data.field,
        data.user.weight as number,
        userId,
      );
    }
    return NextResponse.json(data.user, { status: 200 });
  } catch (e) {
    return NextResponse.json({ err: 'users not updated', e }, { status: 404 });
  }
}

export async function POST(request: NextRequest) {
  const { userId } = auth();
  const data = (await request.json()) as PostParams;

  if (!userId) {
    return NextResponse.json({ err: 'user not found' }, { status: 404 });
  }

  try {
    await UserService.post(userId, data.username, 1);
    return NextResponse.json(
      { id: userId, username: data.username, onboarding: 1, weight: null },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json({ err: 'user not created', e }, { status: 404 });
  }
}
