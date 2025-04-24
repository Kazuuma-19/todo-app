import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import Layout from "@/components/Layout";
import SearchBox from "@/components/SearchBox";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Layout>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Today</h1>
          <SearchBox />
        </div>

        <Outlet />
      </Layout>

      <TanStackRouterDevtools />
    </>
  );
}
