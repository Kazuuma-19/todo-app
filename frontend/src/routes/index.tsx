import { createFileRoute } from "@tanstack/react-router";
import { requireAuth } from "@/lib/requireAuth";

import { SearchBox } from "@/components/SearchBox";
import { TodoList } from "@/features/today/TodoList";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    await requireAuth();
  },
  component: Index,
});

function Index() {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Today</h1>
        <SearchBox />
      </div>

      <TodoList />
    </>
  );
}
