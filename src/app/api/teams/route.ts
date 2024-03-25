import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import TeamsService from '@/services/TeamsService';

type PostParams = {
  name: string;
  description: string;
  password: string;
};

type DeleteParams = {
  id: string;
};

export async function GET() {
  try {
    const result = await TeamsService.get();
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

  if (!userId) {
    return NextResponse.json({ err: 'user not found' }, { status: 404 });
  }

  try {
    await TeamsService.post(name, description, userId, password);
    const createdId = await TeamsService.getIdByName(name);

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

  try {
    await TeamsService.deleteById(id);

    return NextResponse.json({ id: id }, { status: 200 });
  } catch (e: any) {
    if (e.code) {
      return NextResponse.json({ err: 'team not deleted', e }, { status: 404 });
    }

    return NextResponse.json({ err: 'team not deleted', e }, { status: 404 });
  }
}
