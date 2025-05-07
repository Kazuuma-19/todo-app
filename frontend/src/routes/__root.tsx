import {
  createRootRoute,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { Layout } from "@/components/Layout";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const location = useRouterState({ select: (s) => s.location.pathname });
  const isLoginPage = location === "/login";

  return (
    <>
      {isLoginPage ? (
        <Outlet />
      ) : (
        <Layout>
          <Outlet />
        </Layout>
      )}

      <TanStackRouterDevtools />
    </>
  );
}
