import { useInboxSwr } from "./hooks/useInboxSwr";

import { CreateCard } from "@/components/CreateCard";
import { EditCard } from "@/components/EditCard";
import { Toaster } from "sonner";

type TodoListProps = {
  onCreate: (todo: { name: string; date: string }) => void;
  onToggleComplete: (id: string, completed: boolean) => void;
  onEdit: (updates: { id: string; name: string; date: string }) => void;
  onDelete: (id: string) => void;
};

export function InboxList({
  onCreate,
  onToggleComplete,
  onEdit,
  onDelete,
}: TodoListProps) {
  const { todos } = useInboxSwr();

  return (
    <>
      <EditCard
        todos={todos}
        onEdit={onEdit}
        onToggleComplete={onToggleComplete}
        onDelete={onDelete}
      />

      <CreateCard onCreate={onCreate} />

      <Toaster />
    </>
  );
}
