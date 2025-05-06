import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { Layout } from "@/components/Layout";
import { useAuthInit } from "@/hooks/useAuthInit";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  useAuthInit();
  return (
    <>
      <Layout>
        <Outlet />
      </Layout>

      <TanStackRouterDevtools />
    </>
  );
}
