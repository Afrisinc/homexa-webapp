import { NextResponse } from "next/server";
import { conversations } from "@/data/conversations";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  let filteredConversations = conversations;

  if (userId) {
    filteredConversations = conversations.filter((c) => c.userId === userId);
  }

  return NextResponse.json({ conversations: filteredConversations });
}
