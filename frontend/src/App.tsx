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

  const handleToggleComplete = async (id: string) => {
    console.log(id);
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

  const handleDelete = async (id: string) => {
    await axios.delete(`http://localhost:8080/todos/${id}`);
    getTodos();
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <TodoList
          todos={todos}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
    </Layout>
  );
}

export default App;
