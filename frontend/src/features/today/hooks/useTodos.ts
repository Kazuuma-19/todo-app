import { useCallback } from "react";
import { useSetAtom } from "jotai";
import { todosAtom } from "@/stores/todoAtom";
import {
  fetchTodos,
  createTodo,
  updateTodo,
  toggleTodoCompleted,
  deleteTodo,
} from "@/features/today/api/todayApi";

export function useTodos() {
  const setTodos = useSetAtom(todosAtom);

  const getTodos = useCallback(async () => {
    const todos = await fetchTodos();
    setTodos(todos);
  }, [setTodos]);

  const handleCreate = async (todo: { name: string; date: string }) => {
    await createTodo(todo);
    getTodos();
  };

  const handleEdit = async (updates: {
    id: string;
    name: string;
    date: string;
  }) => {
    await updateTodo(updates);
    getTodos();
  };

  const handleToggleComplete = async (id: string, completed: boolean) => {
    await toggleTodoCompleted(id, completed);
    getTodos();
  };

  const handleDelete = async (id: string) => {
    await deleteTodo(id);
    getTodos();
  };

  return {
    getTodos,
    handleCreate,
    handleEdit,
    handleToggleComplete,
    handleDelete,
  };
}
