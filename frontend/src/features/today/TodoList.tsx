import { useTodaySwr } from "./hooks/useTodaySwr";

import { CreateCard } from "@/components/CreateCard";
import { EditCard } from "@/components/EditCard";
import { Toaster } from "sonner";
import { useTodayTodos } from "./hooks/useTodayTodos";

export function TodoList() {
  const { todos } = useTodaySwr();
  const { handleCreate, handleEdit, handleToggleComplete, handleDelete } =
    useTodayTodos();

  return (
    <>
      <EditCard
        todos={todos}
        onEdit={handleEdit}
        onToggleComplete={handleToggleComplete}
        onDelete={handleDelete}
      />

      <CreateCard onCreate={handleCreate} />

      <Toaster />
    </>
  );
}
