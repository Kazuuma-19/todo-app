import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import SearchBox from "./SearchBox";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset className="px-6 py-4">
        <SidebarTrigger />

        <div className="flex items-center justify-between mt-4 mb-6">
          <h1 className="text-2xl font-bold">Today</h1>
          <SearchBox />
        </div>

        <div>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default Layout;
