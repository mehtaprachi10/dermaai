import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import {
  Navigate,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Layout } from "./components/Layout";
import { PrivateRoute } from "./components/PrivateRoute";

// Lazy-loaded pages
const LoginPage = lazy(() => import("./pages/Login"));
const PermissionsPage = lazy(() => import("./pages/Permissions"));
const DashboardPage = lazy(() => import("./pages/Dashboard"));
const NewAnalysisPage = lazy(() => import("./pages/NewAnalysis"));
const AnalysisDetailPage = lazy(() => import("./pages/AnalysisDetail"));

// Loading fallback
function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
    </div>
  );
}

// Root route — redirect based on auth state
function RootIndex() {
  const { identity } = useInternetIdentity();
  if (identity) return <Navigate to="/dashboard" />;
  return <Navigate to="/login" />;
}

// Route definitions
const rootRoute = createRootRoute();

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: RootIndex,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => (
    <Layout showNav={false}>
      <Suspense fallback={<PageLoader />}>
        <LoginPage />
      </Suspense>
    </Layout>
  ),
});

const permissionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/permissions",
  component: () => (
    <Layout>
      <PrivateRoute>
        <Suspense fallback={<PageLoader />}>
          <PermissionsPage />
        </Suspense>
      </PrivateRoute>
    </Layout>
  ),
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => (
    <Layout>
      <PrivateRoute>
        <Suspense fallback={<PageLoader />}>
          <DashboardPage />
        </Suspense>
      </PrivateRoute>
    </Layout>
  ),
});

const newAnalysisRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/new-analysis",
  component: () => (
    <Layout>
      <PrivateRoute>
        <Suspense fallback={<PageLoader />}>
          <NewAnalysisPage />
        </Suspense>
      </PrivateRoute>
    </Layout>
  ),
});

const analysisDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/analysis/$id",
  component: () => (
    <Layout>
      <PrivateRoute>
        <Suspense fallback={<PageLoader />}>
          <AnalysisDetailPage />
        </Suspense>
      </PrivateRoute>
    </Layout>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  permissionsRoute,
  dashboardRoute,
  newAnalysisRoute,
  analysisDetailRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
