import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { query } from "@/db";

export type IExercise = {
  id: number;
  name: string;
  logging_type: string;
};

export type IUserExercise = {
  id: number;
  userId: string;
  exerciseId: number;
  log: string;
  date: string;
};

type GetParams = {
  exerciseId: number;
  log: string;
  date: Date;
};

type DeleteParams = {
  id: number;
};

export async function POST(request: NextRequest) {
  const { userId } = auth();
  const data = (await request.json()) as GetParams;
  const { exerciseId, log, date } = data;

  const sql = `
        INSERT INTO userExercises (userId, exerciseid, log, date)
        VALUES ('${userId}', ${exerciseId}, '${log}', '${date}'); 
    `;

  try {
    const result = await query(sql);
    return NextResponse.json(result, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { err: "Not created invalid data", e },
      { status: 422 },
    );
  }
}

export async function GET() {
  const { userId } = auth();

  const sql = `SELECT * FROM userExercises WHERE userId = '${userId}'`;

  try {
    const result = await query(sql);
    return NextResponse.json(result, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { err: "User exercises not found", e },
      { status: 404 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  const data = (await request.json()) as DeleteParams;
  const { id } = data;

  const sql = `DELETE FROM userExercises WHERE id = ${Number(id)}`;

  try {
    const result = await query(sql);
    return NextResponse.json(result, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { err: "User exercise not deleted", e },
      { status: 404 },
    );
  }
}
