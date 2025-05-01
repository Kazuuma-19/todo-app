import {
  createTodo,
  updateTodo,
  toggleTodoCompleted,
  deleteTodo,
} from "@/features/today/api/todayTodoApi";
import { useTodaySwr } from "./useTodaySwr";

export function useTodayTodos() {
  const { mutate } = useTodaySwr();

  const handleCreate = async (todo: { name: string; date: string }) => {
    await createTodo(todo);
    mutate();
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
    await deleteTodo(id);
    mutate();
  };

  return {
    handleCreate,
    handleEdit,
    handleToggleComplete,
    handleDelete,
  };
}
