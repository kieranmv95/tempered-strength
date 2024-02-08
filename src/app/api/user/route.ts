import { NextRequest, NextResponse } from "next/server";
import { query } from "@/db";

type GetParams = {
  id: string;
};

export async function POST(request: NextRequest) {
  const data = (await request.json()) as GetParams;
  const sql = `SELECT * FROM users WHERE id = '${data.id}'`;

  try {
    const result = await query(sql);
    return NextResponse.json(result, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { err: "users exercises not found", e },
      { status: 404 },
    );
  }
}
