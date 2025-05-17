import {
  createTodo,
  updateTodo,
  toggleTodoCompleted,
  deleteTodo,
} from "@/features/inbox/api/inboxTodoApi";
import { useInboxSwr } from "./useInboxSwr";
import { toast } from "sonner";

export function useInboxTodos() {
  const { mutate } = useInboxSwr();

  const handleCreate = async (todo: { name: string; date: string }) => {
    try {
      await createTodo(todo);
      toast.success("タスクが作成されました");
      mutate();
    } catch (error) {
      toast.error("タスクの作成に失敗しました");
    }
  };

  const handleEdit = async (updates: {
    id: string;
    name: string;
    date: string;
  }) => {
    await updateTodo(updates);
    mutate();
  };

  const handleToggleComplete = async (id: string, completed: boolean) => {
    await toggleTodoCompleted(id, completed);
    mutate();
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTodo(id);
      toast.success("タスクが削除されました");
      mutate();
    } catch (error) {
      toast.error("タスクの削除に失敗しました");
    }
  };

  return {
    handleCreate,
    handleEdit,
    handleToggleComplete,
    handleDelete,
  };
}
