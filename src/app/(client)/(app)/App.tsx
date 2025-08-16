"use client";

import React from "react";
import SetUserFullNameCard from "@/components/SetUserFullNameCard";
import InterviewLayout from "@/components/LocalComponent/Interview/InterviewLayout";
import { useSession } from "next-auth/react";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import SuggestionBox from "@/components/LocalComponent/SuggestionBox";

function App() {
  const { data: session, status } = useSession();
  const user = session?.user;
  return (
    <div className="h-screen w-screen relative flex overflow-hidden">
      {user?.fullName === "Profile User" && <SetUserFullNameCard />}
      <div className="absolute -top-10 right-10 w-96 h-46 transform -rotate-210 dark:bg-purple-500 bg-purple-950 rounded-full blur-3xl opacity-40 overflow-hidden" />

      <div className="left-div">
        <SidebarProvider>
          <AppSidebar />
        </SidebarProvider>
      </div>
      <div className="center-div flex-1 p-5 w-[100%] h-full"><InterviewLayout /></div>
      <div className="right-div">
        <SuggestionBox />
      </div>
    </div>
  );
}

export default App;
