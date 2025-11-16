import { NextResponse } from "next/server";
import { conversations } from "@/data/conversations";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const conversation = conversations.find((c) => c.id === id);

  if (!conversation) {
    return NextResponse.json(
      { error: "Conversation not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ conversation });
}
