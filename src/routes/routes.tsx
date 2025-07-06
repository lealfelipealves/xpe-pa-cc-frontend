import { Loading } from "@/components/loading";
import { lazy, Suspense } from "react";
import { RoutePaths } from "./paths";
import type { RouteType } from "./types";

const Login = lazy(() => import("@/features/sign-in"));
const Logout = lazy(() => import("@/features/logout"));
const Home = lazy(() => import("@/features/home"));
const Success = lazy(() => import("@/features/success"));

export const ListRoutes = (): RouteType[] => [
  {
    path: RoutePaths.home,
    isPrivate: false,
    element: (
      <Suspense fallback={<Loading />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: RoutePaths.logout,
    isPrivate: false,
    element: (
      <Suspense fallback={<Loading />}>
        <Logout />
      </Suspense>
    ),
  },
  {
    path: RoutePaths.dashboard,
    isPrivate: true,
    element: (
      <Suspense fallback={<Loading />}>
        <Home />
      </Suspense>
    ),
  },
    {
    path: RoutePaths.success,
    isPrivate: true,
    element: (
      <Suspense fallback={<Loading />}>
        <Success />
      </Suspense>
    ),
  }
];
