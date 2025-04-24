import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { TodoList } from "@/components/TodoList";
import type { Todo } from "@/types/todo";
import SearchBox from "@/components/SearchBox";

export const Route = createFileRoute("/")({
  component: Index,
});

const apiUrl = `${import.meta.env.VITE_BACKEND_API_URL}/todos`;

function Index() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const getTodos = useCallback(async () => {
    const response = await axios.get(apiUrl);
    setTodos(response.data);
  }, []);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  const handleCreate = async (todo: { name: string; date: string }) => {
    await axios.post(apiUrl, todo);
    getTodos();
  };

  const handleEdit = async (updates: {
    id: string;
    name: string;
    date: string;
  }) => {
    await axios.put(`${apiUrl}/${updates.id}`, {
      name: updates.name,
      date: updates.date,
    });
    getTodos();
  };

  const handleToggleComplete = async (id: string, completed: boolean) => {
    await axios.patch(`${apiUrl}/${id}/completed`, {
      completed,
    });
    getTodos();
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`${apiUrl}/${id}`);
    getTodos();
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Today</h1>
        <SearchBox />
      </div>

      <TodoList
        todos={todos}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onToggleComplete={handleToggleComplete}
        onDelete={handleDelete}
      />
    </>
  );
}
