import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset className="px-6 py-4">
        <SidebarTrigger />

        <div className="max-w-4xl mx-auto w-full my-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
