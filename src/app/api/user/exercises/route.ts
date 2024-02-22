import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { query } from '@/db';
import { ILoggingType, IUserExercise } from '@/types/IExercise';

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

  let sql;

  if (loggingType === 'weight' || loggingType == 'reps') {
    sql = `
        INSERT INTO userExercises (userId, exerciseid, log, date)
        VALUES ('${userId}', ${exerciseId}, '${log}', '${date}'); 
    `;
  }

  if (loggingType === 'duration') {
    sql = `
        INSERT INTO userExercises (userId, exerciseid, date, duration)
        VALUES ('${userId}', ${exerciseId}, '${date}', '${duration}'); 
    `;
  }

  try {
    const result = await query(sql as string);
    return NextResponse.json(result, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { err: 'Not created invalid data', e },
      { status: 422 },
    );
  }
}

export async function GET() {
  const { userId } = auth();

  const sql = `SELECT * FROM userExercises WHERE userId = '${userId}'`;

  try {
    const result = (await query(sql)) as IUserExercise[];

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
  const data = (await request.json()) as DeleteParams;
  const { id } = data;

  const sql = `DELETE FROM userExercises WHERE id = ${Number(id)}`;

  try {
    const result = await query(sql);
    return NextResponse.json(result, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { err: 'User exercise not deleted', e },
      { status: 404 },
    );
  }
}
