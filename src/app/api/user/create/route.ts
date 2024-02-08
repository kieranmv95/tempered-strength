import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { query } from "@/db";

type GetParams = {
  username: string;
};

export async function POST(request: NextRequest) {
  const { userId } = auth();
  const data = (await request.json()) as GetParams;
  const sql = `INSERT INTO users (id, username, onboarding)VALUES ('${userId}', '${data.username.toLowerCase()}', 1);`;

  try {
    await query(sql);
    return NextResponse.json(
      { id: userId, username: data.username, onboarding: 1 },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json({ err: "users not created", e }, { status: 404 });
  }
}
