import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";

type Todo = {
  id: string;
  completed: boolean;
  name: string;
  dateTime: Date;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const getTodos = async () => {
    const response = await axios.get("http://localhost:8080/todos");
    setTodos(response.data);
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      {todos.map((todo) => (
        <div key={todo.id}>
          <h2>{todo.name}</h2>
          {/* <p>{todo.dateTime}</p> */}
        </div>
      ))}
      <Button>Click me</Button>
    </>
  );
}
export default App;
