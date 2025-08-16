"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Biohazard,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavCustomizations } from "@/components/nav-customizations";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";

// This is sample data.
const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "/history",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  customizations: [
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state, toggleSidebar } = useSidebar();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [isDoubleClick, setIsDoubleClick] = React.useState(false);
  const handleMouseEnter = () => {
    if (state === "collapsed" && !isDoubleClick) {
      toggleSidebar(); // expand
    }
  };

  const handleMouseLeave = () => {
    if (state === "expanded" && !isDropdownOpen && !isDoubleClick) {
      toggleSidebar();
    }
  };

  return (
    <Sidebar
      onDoubleClick={() => setIsDoubleClick(!isDoubleClick)}
      collapsible="icon"
      {...props}  
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`transition-all duration-300 ease-in-out ${props.className} ${
        state !== "expanded"
          ? "h-[90vh]  top-8 fixed rounded-tr-2xl rounded-br-2xl"
          : "h-screen relative translate-y-0"
      } ${isDoubleClick ? "cursor-crosshair" : ""}`}
      style={{
        position: state !== "expanded" ? "fixed" : "relative",
        left: 0,
      }}
    >
      <SidebarHeader>
        <TeamSwitcher
          teams={data.teams}
          onDropdownOpenChange={setIsDropdownOpen}
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavCustomizations
          projects={data.customizations}
          onDropdownOpenChange={setIsDropdownOpen}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser onDropdownOpenChange={setIsDropdownOpen} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
