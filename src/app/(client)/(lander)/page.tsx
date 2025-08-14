"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";


function Lander() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="absolute top-4 right-4">
        <ThemeToggle/>
      </div>
      <h2 className="text-xl font-semibold mb-4">
        You need to sign in to access the main page
      </h2>
      <Button onClick={() => router.push("/signup")}>Sign Up</Button>
    </div>
  );
}

export default Lander;
