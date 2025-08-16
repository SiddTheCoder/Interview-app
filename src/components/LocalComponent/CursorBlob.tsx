"use client";
import { useTheme } from "next-themes";
import React, { useState, useEffect } from "react";

export default function CursorBlob() {
  const { theme } = useTheme();
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]">
      <div
        className="absolute rounded-full blur-3xl transition-colors duration-300"
        style={{
          top: pos.y - 75,
          left: pos.x - 75,
          width: 150,
          height: 150,
          background:
            theme === "light"
              ? "radial-gradient(circle, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0) 80%)"
              : "radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(150,0,255,0.25) 40%, rgba(0,0,0,0) 80%)",
        }}
      />
    </div>
  );
}
