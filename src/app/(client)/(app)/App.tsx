"use client";

import React from "react";
import SetUserFullNameCard from "@/components/SetUserFullNameCard";
import { ThemeToggle } from "@/components/ThemeToggle";
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
      <div className="center-div flex-1 p-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, ratione sit quasi veniam nulla nemo ipsam nesciunt minus ab aspernatur vel quos, voluptatum suscipit alias neque officia magni modi eveniet saepe. Quos aspernatur excepturi tempora dignissimos ipsa tenetur, officia vel illo facere fugit rem rerum molestias optio veritatis praesentium omnis? Dolor voluptates distinctio asperiores molestiae dolore ex quasi praesentium, veniam corrupti libero debitis quos quibusdam id officiis animi adipisci molestias ad assumenda aliquid voluptatibus modi facilis recusandae quisquam et! Placeat omnis harum atque suscipit iusto id, dolore velit temporibus? Suscipit deleniti quae similique quibusdam veniam pariatur voluptatem in temporibus maxime culpa excepturi optio, iste facere, quisquam inventore ea consequuntur expedita vel officia sit facilis eligendi error! Maiores odit quae officia odio ea blanditiis, fugit omnis id veritatis suscipit adipisci laudantium voluptatem ad molestiae aperiam et, illum a consectetur libero dicta! Tempore repel``.

      </div>
      <div className="right-div">
      <SuggestionBox />
      </div>
    </div>
  );
}

export default App;
