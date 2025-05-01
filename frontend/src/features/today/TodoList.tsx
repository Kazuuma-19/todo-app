import { CreateCard } from "@/components/CreateCard";
import { EditCard } from "@/components/EditCard";
import { useTodaySwr } from "./hooks/useTodaySwr";

type TodoListProps = {
  onCreate: (todo: { name: string; date: string }) => void;
  onToggleComplete: (id: string, completed: boolean) => void;
  onEdit: (updates: { id: string; name: string; date: string }) => void;
  onDelete: (id: string) => void;
};

export function TodoList({
  onCreate,
  onToggleComplete,
  onEdit,
  onDelete,
}: TodoListProps) {
  const { todos } = useTodaySwr();

  return (
    <>
      <EditCard
        todos={todos}
        onEdit={onEdit}
        onToggleComplete={onToggleComplete}
        onDelete={onDelete}
      />

      <CreateCard onCreate={onCreate} />
    </>
  );
}
