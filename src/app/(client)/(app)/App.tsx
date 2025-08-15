"use client";

import React from "react";
import SetUserFullNameCard from "@/components/SetUserFullNameCard";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useSession } from "next-auth/react";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

function App() {
  const { data: session, status } = useSession();
  const user = session?.user;
  return (
    <div className="h-screen w-screen relative">
      {user?.fullName === "Profile User" && <SetUserFullNameCard />}
      <div className="absolute -top-10 right-10 w-96 h-46 transform -rotate-210 dark:bg-purple-500 bg-purple-950 rounded-full blur-3xl opacity-40 overflow-hidden" />
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="">
        <SidebarProvider>
          <AppSidebar />
        </SidebarProvider>
      </div>
    </div>
  );
}

export default App;
