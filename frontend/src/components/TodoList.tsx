import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import type { Todo } from "@/types/todo";

type TodoListProps = {
  todos: Todo[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
};

export function TodoList({ todos, onToggleComplete, onDelete }: TodoListProps) {
  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <Card key={todo.id} className={todo.completed ? "opacity-60" : ""}>
          <CardHeader className="flex items-center space-x-4">
            <Checkbox
              checked={todo.completed}
              onCheckedChange={() => onToggleComplete(todo.id)}
            />

            <div className="flex-1">
              <CardTitle className={todo.completed ? "line-through" : ""}>
                {todo.name}
              </CardTitle>

              <CardDescription>{todo.date}</CardDescription>
            </div>

            <Button
              variant="ghost"
              className="h-8 w-8 text-gray-500 hover:text-red-500"
              onClick={() => onDelete(todo.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
