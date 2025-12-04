import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./pages/SignUp";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Login from "./pages/Login";
import QRList from "./pages/QRList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import Class from "./pages/Class";
import ScanQr from "./pages/ScanQr";
import { AppProvider } from "./context/AppContext";
import { Toaster } from "sonner";

export const router = createBrowserRouter([
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/qr-list",
        element: <QRList />,
      },
      {
        path: "/class/:id",
        element: <Class />,
      },
      {
        path: "/class/:id/scan-qr",
        element: <ScanQr />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <Toaster />

        <RouterProvider router={router} />
      </AppProvider>
    </QueryClientProvider>
  </StrictMode>
);
