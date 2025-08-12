import { useEffect } from "react";
import { pusherClient } from "@/lib/pusher/pusherClient";

export function useInterviewChannel(sessionId: string, handlers: any) {
  useEffect(() => {
    if (!sessionId) return;

    const channel = pusherClient.subscribe(`interview-${sessionId}`);

    Object.entries(handlers).forEach(([event, handler]) => {
      channel.bind(event, handler as Function);
    });

    return () => {
      Object.entries(handlers).forEach(([event, handler]) => {
        channel.unbind(event, handler as Function);
      });
      pusherClient.unsubscribe(`interview-${sessionId}`);
    };
  }, [sessionId]);
}
