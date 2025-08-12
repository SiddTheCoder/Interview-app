"use client";
import Image from "next/image";
import { usePusherEvents } from "@/context/PusherProvider";
import { useEffect } from "react";

export default function Home() {
  const { events } = usePusherEvents();

  console.log("events", events);

  return <div>Home page</div>;
}
