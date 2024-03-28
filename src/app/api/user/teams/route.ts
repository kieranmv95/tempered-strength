import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import UserTeamsService from '@/services/UserTeamsService';

export async function GET() {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ err: 'No User' }, { status: 422 });
  }

  try {
    const result = await UserTeamsService.getByUserId(userId);

    const sanitisedPasswordsResult = result.map(team => ({
      ...team,
      password: !!(team.password as unknown as string).length,
      owner: team.ownerUserId === userId,
    }));
    return NextResponse.json(sanitisedPasswordsResult, { status: 200 });
  } catch (e) {
    return NextResponse.json({ err: 'Teams not found', e }, { status: 404 });
  }
}
