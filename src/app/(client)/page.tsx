"use client";
import Image from "next/image";
import { usePusherEvents } from "@/context/PusherProvider";
import { useEffect } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { events } = usePusherEvents();

  console.log("events", events);

  return (
    <div className="min-h-screen bg-background">
      <Button>Hellow</Button>
      <ThemeToggle />
    </div>
  );
}
