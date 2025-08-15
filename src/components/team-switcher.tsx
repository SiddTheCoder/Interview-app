"use client"

import * as React from "react"

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useRouter } from "next/navigation";

export function TeamSwitcher({
  teams,
  onDropdownOpenChange,
}: {
    teams: {
      name: string
      logo: React.ElementType
      plan: string
  }[];
  onDropdownOpenChange?: (isOpen: boolean) => void
}) {
  const [activeTeam, setActiveTeam] = React.useState(teams[0])

  if (!activeTeam) {
    return null
  }

  const router = useRouter()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu
          onOpenChange={(open) => {
            onDropdownOpenChange?.(open);
          }}
        >
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              onClick={() => router.replace("/")}
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <activeTeam.logo className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{process.env.NEXT_PUBLIC_APP_NAME}</span>
                <span className="truncate text-xs">Powered by ChromoVerse</span>
              </div>
              
            </SidebarMenuButton>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
