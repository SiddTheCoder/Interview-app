"use client";

import { useSession, signIn } from "next-auth/react";
import MainApp from "@/app/(client)/(app)/App";
import LanderPage from "@/app/(client)/(lander)/page";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "authenticated" && session?.user) {
    return <MainApp />;
  }

  return <LanderPage />;
}
