import { createBrowserRouter, type RouteObject } from "react-router";
import { lazy, Suspense, type ReactNode } from "react";
import { Navigate } from "react-router";
import Loader from "@/components/Loader";

// Lazy-loaded components
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Assignments = lazy(() => import("@/pages/Assignments"));
const Reports = lazy(() => import("@/pages/Reports"));
const Submissions = lazy(() => import("@/pages/Submissions"));
const UserManagement = lazy(() => import("@/pages/UserManagement"));
const Roles = lazy(() => import("@/pages/Roles"));
const Permissions = lazy(() => import("@/pages/Permissions"));
const BatchSettings = lazy(() => import("@/pages/Batches"));

// Type for route props
interface PrivateRouteProps {
  children: ReactNode;
}

// Route Guard for authenticated routes
const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isAuthenticated = localStorage.getItem("authToken");
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

// Define the routes with explicit types
const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Suspense fallback={<Loader />}>
          <Dashboard />
        </Suspense>
      </PrivateRoute>
    ),
    children: [
      {
        path: "assignments",
        element: (
          <Suspense fallback={<Loader />}>
            <Assignments />
          </Suspense>
        ),
      },
      {
        path: "reports",
        element: (
          <Suspense fallback={<Loader />}>
            <Reports />
          </Suspense>
        ),
      },
      {
        path: "submissions",
        element: (
          <Suspense fallback={<Loader />}>
            <Submissions />
          </Suspense>
        ),
      },
      {
        path: "users",
        element: (
          <Suspense fallback={<Loader />}>
            <UserManagement />
          </Suspense>
        ),
      },
      {
        path: "roles",
        element: (
          <Suspense fallback={<Loader />}>
            <Roles />
          </Suspense>
        ),
      },
      {
        path: "permissions",
        element: (
          <Suspense fallback={<Loader />}>
            <Permissions />
          </Suspense>
        ),
      },
      {
        path: "batch-settings",
        element: (
          <Suspense fallback={<Loader />}>
            <BatchSettings />
          </Suspense>
        ),
      },
    ],
  },
];

// Create the router
const AppRouter = createBrowserRouter(routes);

export default AppRouter;
