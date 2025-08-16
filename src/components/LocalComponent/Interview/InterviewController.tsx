"use client";

import React, { useState } from "react";
import {
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Square,
  MonitorPlay,
} from "lucide-react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  toggleCamera,
  toggleMic,
} from "@/store/features/localState/localStateSlice";
import { useAppDispatch } from "@/store/hooks";

function InterviewController() {
  const dispatch = useAppDispatch();

  const controllerItems = [
    {
      name: "Mute / Unmute",
      icon: Mic,
      altIcon: MicOff,
      action: () => {
        dispatch(toggleMic());
      },
      variant: "default",
    },
    {
      name: "Camera On / Off",
      icon: Video,
      altIcon: VideoOff,
      action: () => {
        dispatch(toggleCamera());
      },
      variant: "default",
    },
    {
      name: "Start Interview",
      icon: Phone,
      altIcon: PhoneOff,
      action: () => toast.success("Interview started"),
      variant: "success",
    },
    {
      name: "End Interview",
      icon: PhoneOff,
      altIcon: Phone,
      action: () => toast.success("Interview ended"),
      variant: "destructive",
    },
    {
      name: "Record Session",
      icon: Square,
      altIcon: Square,
      action: () => toast.success("Recording started"),
      variant: "default",
    },
    {
      name: "Share Screen",
      icon: MonitorPlay,
      altIcon: MonitorPlay,
      action: () => toast.success("Screen sharing"),
      variant: "default",
    },
  ];

  return (
    <TooltipProvider>
      <div className="w-full h-20 flex gap-6 items-center justify-center dark:bg-slate-900/50 bg-slate-200/50 backdrop-blur-md rounded-t-2xl shadow-lg">
        {controllerItems.map((item, idx) => {
          const [hovered, setHovered] = useState(false);
          const Icon = hovered ? item.altIcon || item.icon : item.icon;

          return (
            <Tooltip key={idx}>
              <TooltipTrigger asChild>
                <button
                  onClick={item.action}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  className={`flex items-center justify-center rounded-full p-3 transition-all duration-200 hover:scale-110 shadow-md
                  ${
                    item.variant === "success"
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : ""
                  }
                  ${
                    item.variant === "destructive"
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : ""
                  }
                  ${
                    !item.variant || item.variant === "default"
                      ? "bg-slate-700 text-white hover:bg-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700"
                      : ""
                  }
                `}
                >
                  <Icon className="w-6 h-6" />
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="rounded-lg px-3 py-1 text-sm bg-slate-800 text-white dark:bg-slate-100 dark:text-black shadow-md"
              >
                {item.name}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}

export default InterviewController;
