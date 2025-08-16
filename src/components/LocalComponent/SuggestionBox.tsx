import React from "react";
import { toggleSuggestionBox } from "@/store/features/localState/localStateSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Button } from "../ui/button";
import UserCamera from "./Interview/UserCamera";

// 🔹 Centralized config for actions
const suggestionActions = [
  {
    label: "Quick Response",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    label: "Detailed Analysis",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0
             a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
  },
  {
    label: "Creative Ideas",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21
             12h-1M4 12H3m3.343-5.657l-.707-.707m2.828
             9.9a5 5 0 117.072 0l-.548.547A3.374
             3.374 0 0014 18.469V19a2 2 0
             11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
  },
  {
    label: "Problem Solving",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8.228 9c.549-1.165 2.03-2
             3.772-2 2.21 0 4 1.343 4 3
             0 1.4-1.278 2.575-3.006
             2.907-.542.104-.994.54-.994
             1.093m0 3h.01M21 12a9 9 0
             11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

function SuggestionBox() {
  const [isDoubleClick, setIsDoubleClick] = React.useState(false);
  const { isSuggestionBoxOpen } = useAppSelector((state) => state.localState);
  const [showHint, setShowHint] = React.useState(false);
  const [cursorPos, setCursorPos] = React.useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const dispatch = useAppDispatch();

  const handleToggle = () => {
    setIsDoubleClick(false);
    dispatch(toggleSuggestionBox());
  };

  const handleMouseEnter = () => {
    if (!isSuggestionBoxOpen && !isDoubleClick) {
      handleToggle();
    }
  };

  // Tooltip logic
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowHint(false);

    timeoutRef.current = setTimeout(() => {
      setShowHint(true);
    }, 1000);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowHint(false);
    if (isSuggestionBoxOpen && !isDoubleClick) {
      handleToggle();
    }
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onDoubleClick={() => setIsDoubleClick(!isDoubleClick)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`h-full flex justify-center items-center w-full bg-transparent ${
        isDoubleClick ? "cursor-crosshair" : ""
      }`}
    >
      <div
        className={`transition-all duration-350 ease-in-out relative 
          bg-sidebar text-sidebar-foreground dark:bg-sidebar dark:text-sidebar-foreground
          ${
            isSuggestionBoxOpen
              ? "w-68 h-[100%] bg-transparent"
              : "w-12 h-[92%] rounded-tl-xl rounded-bl-xl"
          }
        `}
      >
        {/* Toggle Button */}
        <Button
          onClick={handleToggle}
          className="absolute top-4 left-2 w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors duration-200 z-10"
        >
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${
              isSuggestionBoxOpen ? "" : "rotate-180"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Button>

        {/* Content Area */}
        <div className="h-full p-4 pt-16">
          {isSuggestionBoxOpen ? (
            // Expanded Version
            <div className="h-full flex flex-col space-y-4">
              <div className="text-lg font-semibold mb-4">Suggestions</div>

              <div className="flex flex-col space-y-2">
                {suggestionActions.map((action, idx) => (
                  <Button
                    key={idx}
                    variant="ghost"
                    className="flex items-center space-x-2 justify-start"
                  >
                    {action.icon}
                    <span>{action.label}</span>
                  </Button>
                ))}
              </div>

              {/* Additional Features */}
              <UserCamera />
            </div>
          ) : (
            // Collapsed Version
            <div className="h-full flex flex-col items-center justify-start space-y-4">
              {suggestionActions.map((action, idx) => (
                <Button
                  key={idx}
                  variant="ghost"
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200"
                  title={action.label}
                >
                  {action.icon}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating Tooltip */}
      {showHint && (
        <div
          className="absolute bg-black text-white text-xs px-2 py-1 rounded shadow-lg"
          style={{
            top:
              cursorPos.y +
              16 -
              (document.getElementById("__next")?.getBoundingClientRect().top ??
                0),
            left: cursorPos.x + 8,
          }}
        >
          Double-click to fix the suggestion box
        </div>
      )}
    </div>
  );
}

export default SuggestionBox;
