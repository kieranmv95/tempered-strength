import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs';
import { query } from "@/db";

export type IExercise = {
    id: number;
    name: string;
    logging_type: string;
}

export type IUserExercise = {
    id: number;
    userId: string;
    exerciseId: number;
    log: string;
    date: string;
}

type Params = {
    exerciseId: number,
    log: string;
    date: Date;
}

export async function POST(request: NextRequest) {
    const { userId } = auth();
    const data = await request.json() as Params;
    const { exerciseId, log, date} = data;

    const sql = `
        INSERT INTO userExercises (userId, exerciseid, log, date)
        VALUES ('${userId}', ${exerciseId}, '${log}', '${date}'); 
    `;

    try {
        const result = await query(sql);
        return  NextResponse.json(result, { status: 201 })
    } catch (e) {
        return NextResponse.json({ err: "Not created invalid data", e}, { status: 422 })
    }
}
