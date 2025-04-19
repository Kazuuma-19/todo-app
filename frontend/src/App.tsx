import { Button } from "@/components/ui/button";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

type Todo = {
  id: string;
  completed: boolean;
  name: string;
  date: string;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const getTodos = useCallback(async () => {
    const response = await axios.get("http://localhost:8080/todos");
    setTodos(response.data);
  }, []);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return (
    <>
      <h1>Github Actions Test</h1>
      {todos.map((todo) => (
        <div key={todo.id}>
          <h2>{todo.name}</h2>
          <p>{todo.date}</p>
        </div>
      ))}
      <Button>Click me</Button>
    </>
  );
}
export default App;
