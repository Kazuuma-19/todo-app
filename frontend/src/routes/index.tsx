import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { TodoList } from "@/features/today/TodoList";
import { useTodos } from "@/features/today/hooks/useTodos";

import SearchBox from "@/components/SearchBox";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const {
    getTodos,
    handleCreate,
    handleEdit,
    handleToggleComplete,
    handleDelete,
  } = useTodos();

  useEffect(() => {
    getTodos();
  }, [getTodos]);

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
