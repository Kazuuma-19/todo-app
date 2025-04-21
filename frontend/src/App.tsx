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

  const handleDelete = async (id: string) => {
    console.log("delete", id);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <TodoList
          todos={todos}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDelete}
        />
      </div>
    </Layout>
  );
}

export default App;
