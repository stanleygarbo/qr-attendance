// components/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useSnapshot } from "valtio";
import { authActions, authStore } from "@/store/authStore";
import { Button } from "./ui/button";

export const ProtectedRoute = () => {
  const { user, loading } = useSnapshot(authStore);

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="max-w-[1200px] mx-auto">
      <nav className="relative flex justify-between w-full h-[70px] items-center border-b no-print">
        <div className="font-bold text-xl">Hello,</div>
        <Button
          variant={"outline"}
          onClick={async () => {
            console.log("first");
            await authActions.logout();
            console.log("first");
          }}
        >
          Logout
        </Button>
        <img
          src="/cat.GIF"
          alt=""
          className="absolute w-8 transform left-2 top-[6px]"
        />
      </nav>
      <Outlet />
    </div>
  ); // render nested child routes
};
