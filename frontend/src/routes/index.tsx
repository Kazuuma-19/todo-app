import { createFileRoute } from "@tanstack/react-router";
import { TodoList } from "@/features/today/TodoList";
import { useTodayTodos } from "@/features/today/hooks/useTodayTodos";

import { SearchBox } from "@/components/SearchBox";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { handleCreate, handleEdit, handleToggleComplete, handleDelete } =
    useTodayTodos();

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Today</h1>
        <SearchBox />
      </div>

      <TodoList
        onCreate={handleCreate}
        onEdit={handleEdit}
        onToggleComplete={handleToggleComplete}
        onDelete={handleDelete}
      />
    </>
  );
}
