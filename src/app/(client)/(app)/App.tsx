"use client";

import React from "react";
import SetUserFullNameCard from "@/components/SetUserFullNameCard";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useSession } from "next-auth/react";

function App() {
  const { data: session, status } = useSession()
  const user = session?.user;
  return (
    <div className="h-screen w-screen relative">
      <div className="absolute -top-10 right-10 w-96 h-36 transform -rotate-210 bg-purple-500 rounded-full blur-3xl opacity-40 overflow-hidden" />
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      {(user?.fullName === "Profile User") && <SetUserFullNameCard />}
    </div>
  );
}

export default App;
