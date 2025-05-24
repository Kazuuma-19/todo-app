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
  return <TodoList />;
}
