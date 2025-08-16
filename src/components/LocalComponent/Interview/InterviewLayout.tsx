import React from "react";
import InterviewController from "./InterviewController";
import { useAppSelector } from "@/store/hooks";
import UserCamera from "./UserCamera";
import InterviewRobotAnimation from "./InterviewRobotAnimation";
import UserMic from "./UserMic";

function InterviewLayout() {
  const { isSuggestionBoxOpen } = useAppSelector((state) => state.localState);
  return (
    <div className="w-full h-full flex flex-col justify-end items-center relative">
      <div className="w-full h-full flex flex-col">
        <div className="w-full h-10 flex items-center justify-center">
          <span className="highlight-tilt px-3 py-2 text-xl text-slate-950 hover:transform hover:-rotate-3 transition-all duration-200 ease-in">
            {process.env.NEXT_PUBLIC_APP_NAME}
          </span>
        </div>
        <div className="flex h-full w-full">
          <div className="flex-1 bg-amber-100/5">
            {/* MESSAGES FROM USER AND AI */}
          </div>
          <div className="flex-1">
            <InterviewRobotAnimation />
          </div>
          <div className="flex-1"></div>
        </div>
      </div>
      <div>
        <InterviewController />
      </div>
      {!isSuggestionBoxOpen && (
        <div className="absolute bottom-0 right-0">
          <UserCamera />
        </div>
      )}
      <UserMic />
    </div>
  );
}

export default InterviewLayout;
