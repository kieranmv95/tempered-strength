import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { query } from "@/db";

type GetParams = {
  username: string;
};

export async function POST(request: NextRequest) {
  const { userId } = auth();
  const data = (await request.json()) as GetParams;
  const sql = `UPDATE users SET username = '${data.username.toLowerCase()}' WHERE id = '${userId}';`;

  try {
    await query(sql);
    return NextResponse.json(
      { id: userId, username: data.username, onboarding: 1 },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json({ err: "users not updated", e }, { status: 404 });
  }
}
