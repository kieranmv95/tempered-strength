import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import UserWorkoutsService from '@/services/UserWorkoutsService';

export type PostWorkoutParams = {
  workoutId: number;
  log: string;
  date: string;
};

export async function POST(request: NextRequest) {
  const { userId } = auth();
  const data = (await request.json()) as PostWorkoutParams;
  const { workoutId, log, date } = data;

  if (!userId) {
    return NextResponse.json({ err: 'No User' }, { status: 422 });
  }

  try {
    const res = await UserWorkoutsService.post(userId, workoutId, log, date);
    return NextResponse.json(res, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { err: 'Not created invalid data', e },
      { status: 422 },
    );
  }
}

export async function GET() {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ err: 'No User' }, { status: 422 });
  }

  try {
    const result = await UserWorkoutsService.getByUserId(userId);

    return NextResponse.json(result, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { err: 'User workouts not found', e },
      { status: 404 },
    );
  }
}

type DeleteParams = {
  id: number;
};

export async function DELETE(request: NextRequest) {
  const data = (await request.json()) as DeleteParams;
  const { id } = data;

  try {
    await UserWorkoutsService.deleteById(id);
    return NextResponse.json({ status: 200 });
  } catch (e) {
    return NextResponse.json(
      { err: 'User workout not deleted', e },
      { status: 404 },
    );
  }
}
