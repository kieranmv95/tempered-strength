import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { query } from '@/db';
import { IUserWorkout } from '@/types/IWorkout';

export type PostWorkoutParams = {
  workoutId: number;
  log: string;
  date: string;
};

export async function POST(request: NextRequest) {
  const { userId } = auth();
  const data = (await request.json()) as PostWorkoutParams;
  const { workoutId, log, date } = data;

  let sql = `
      INSERT INTO userWorkouts (userId, workoutId, log, date)
      VALUES ('${userId}', ${workoutId}, '${log}', '${date}'); 
  `;

  console.log(sql);

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

  const sql = `SELECT * FROM userWorkouts WHERE userId = '${userId}'`;

  try {
    const result = (await query(sql)) as IUserWorkout[];

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

  const sql = `DELETE FROM userWorkouts WHERE id = ${Number(id)}`;

  try {
    const result = await query(sql);
    return NextResponse.json(result, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { err: 'User workout not deleted', e },
      { status: 404 },
    );
  }
}
