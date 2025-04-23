import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { TodoList } from "@/components/TodoList";
import type { Todo } from "@/types/todo";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const getTodos = useCallback(async () => {
    const response = await axios.get("http://localhost:8080/todos");
    setTodos(response.data);
  }, []);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  const handleCreate = async (todo: { name: string; date: string }) => {
    await axios.post("http://localhost:8080/todos", todo);
    getTodos();
  };

  const handleEdit = async (updates: {
    id: string;
    name: string;
    date: string;
  }) => {
    await axios.put(`http://localhost:8080/todos/${updates.id}`, {
      name: updates.name,
      date: updates.date,
    });
    getTodos();
  };

  const handleToggleComplete = async (id: string, completed: boolean) => {
    await axios.patch(`http://localhost:8080/todos/${id}/completed`, {
      completed,
    });
    getTodos();
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`http://localhost:8080/todos/${id}`);
    getTodos();
  };

  return (
    <Layout>
      <TodoList
        todos={todos}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onToggleComplete={handleToggleComplete}
        onDelete={handleDelete}
      />
    </Layout>
  );
}

export default App;
