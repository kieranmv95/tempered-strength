import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { ILoggingType } from '@/types/IExercise';
import ExerciseService from '@/services/ExerciseService';
import UserExercisesService from '@/services/UserExercisesService';

type PostParams = {
  exerciseId: number;
  log: number;
  duration: string;
  date: Date;
  loggingType: ILoggingType;
};

export async function POST(request: NextRequest) {
  const { userId } = auth();
  const data = (await request.json()) as PostParams;
  const { exerciseId, log, date, duration, loggingType } = data;

  if (!userId) {
    return NextResponse.json({ err: 'No User' }, { status: 401 });
  }

  try {
    if (loggingType === 'weight' || loggingType == 'reps') {
      const result = await UserExercisesService.post(userId, exerciseId, date, {
        log,
      });
      return NextResponse.json(result, { status: 201 });
    }

    if (loggingType === 'duration') {
      const result = await UserExercisesService.post(userId, exerciseId, date, {
        duration,
      });
      return NextResponse.json(result, { status: 201 });
    }
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
    return NextResponse.json({ err: 'No User' }, { status: 401 });
  }

  try {
    const result = await UserExercisesService.getById(userId);

    const mappedResult = result.map(userExercise => ({
      ...userExercise,
      log: Number(userExercise.log),
    }));

    return NextResponse.json(mappedResult, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { err: 'User exercises not found', e },
      { status: 404 },
    );
  }
}

type DeleteParams = {
  id: number;
};

export async function DELETE(request: NextRequest) {
  const { userId } = auth();
  const data = (await request.json()) as DeleteParams;
  const { id } = data;

  if (!userId) {
    return NextResponse.json({ err: 'No User' }, { status: 401 });
  }

  try {
    const deletedId = await ExerciseService.deleteById(id);
    return NextResponse.json({ id: deletedId }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { err: 'User exercise not deleted', e },
      { status: 404 },
    );
  }
}
