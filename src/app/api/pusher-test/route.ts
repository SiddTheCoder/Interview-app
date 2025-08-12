import { NextResponse } from "next/server";
import { pusherServer } from "@/lib/pusher/pusherServer";

export async function GET() {
  await pusherServer.trigger("test-channel", "test-event", {
    message: "Hello Pusher !!",
  });
  return NextResponse.json({ ok: true });
}
