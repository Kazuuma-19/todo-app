import { useInboxSwr } from "./hooks/useInboxSwr";

import { CreateCard } from "@/components/CreateCard";
import { EditCard } from "@/components/EditCard";
import { Toaster } from "sonner";
import { useInboxTodos } from "./hooks/useInboxTodos";

export function InboxList() {
  const { todos } = useInboxSwr();
  const { handleCreate, handleEdit, handleToggleComplete, handleDelete } =
    useInboxTodos();

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
