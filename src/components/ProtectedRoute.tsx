// components/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useSnapshot } from "valtio";
import { authStore } from "@/store/authStore";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { AppSidebar } from "./app-sidebar";

export const ProtectedRoute = () => {
  const { user, loading } = useSnapshot(authStore);

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="flex">
      <SidebarProvider>
        <AppSidebar />
        <div className="p-4 w-full h-full pl-0">
          <main className="bg-gray-100 w-full rounded-xl h-full p-4 relative">
            <SidebarTrigger />
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    </div>
  ); // render nested child routes
};
