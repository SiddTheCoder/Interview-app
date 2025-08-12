import { NextResponse } from "next/server";
import { emitEvent } from "@/lib/pusher/pusherServer";
import { randomUUID } from "crypto";

export async function POST() {
  const sessionId = randomUUID();

  // Emit first event just to test
  await emitEvent(sessionId, "questions_ready", {
    question: "Tell me about yourself?",
    index: 0,
  });

  return NextResponse.json({ ok: true, sessionId });
}
