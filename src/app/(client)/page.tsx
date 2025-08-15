"use client";
import { useSession } from "next-auth/react";
import LanderPage from "@/app/(client)/(lander)/page";
import MainApp from "@/app/(client)/(app)/App";

export default function Home() {
  const { data: session, status } = useSession();
  console.log("Session data:", session);
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "authenticated" && session?.user) {
    return <MainApp />;
  }

  return <LanderPage />;
}
