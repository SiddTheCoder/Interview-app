import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar  />
      {/* <SidebarTrigger className="-ml-1" /> */}
    </SidebarProvider>
  );
}
