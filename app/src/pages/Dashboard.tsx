import { AppSidebar } from "@/components/Sidebar";
import Navbar from "@/components/layouts/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router";

export default function Dashboard() {
  return (
    <>
      <SidebarProvider>
        <main className="w-full">
          <section className="flex">
            <AppSidebar />
            <div className="flex flex-col flex-1">
              <Navbar />
              <div className="p-4">
                <Outlet />
              </div>
            </div>
          </section>
        </main>
      </SidebarProvider>
    </>
  );
}
