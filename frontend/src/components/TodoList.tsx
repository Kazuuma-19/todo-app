import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { format, parseISO } from "date-fns";
import type { Todo } from "@/types/todo";

type TodoListProps = {
  todos: Todo[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updates: { name: string; date: string }) => void;
};

export function TodoList({
  todos,
  onToggleComplete,
  onDelete,
  onEdit,
}: TodoListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState({ name: "", date: "" });

  // PP = "Apr 29, 1453"
  const formatDisplayDate = (dateString: string) => {
    return format(parseISO(dateString), "PP");
  };

  const formatDateForInput = (dateString: string) => {
    return format(parseISO(dateString), "yyyy-MM-dd");
  };

  const handleEditClick = (todo: Todo) => {
    setEditingId(todo.id);
    setEditValues({
      name: todo.name,
      date: formatDateForInput(todo.date),
    });
  };

  const handleEditSubmit = (id: string) => {
    onEdit(id, editValues);
    setEditingId(null);
  };

  // キーボードのkeyが押された際の処理
  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === "Enter") {
      handleEditSubmit(id);
    } else if (e.key === "Escape") {
      setEditingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <Card
          key={todo.id}
          className={`${
            todo.completed ? "opacity-60" : ""
          } cursor-pointer hover:bg-gray-50`}
          onClick={() => handleEditClick(todo)}
        >
          <CardHeader className="flex items-center space-x-4">
            <Checkbox
              checked={todo.completed}
              onCheckedChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.stopPropagation();
                onToggleComplete(todo.id);
              }}
            />

            <div className="flex-1 space-y-2">
              {editingId === todo.id ? (
                <>
                  <Input
                    value={editValues.name}
                    onChange={(e) =>
                      setEditValues({ ...editValues, name: e.target.value })
                    }
                    onKeyDown={(e) => handleKeyDown(e, todo.id)}
                    autoFocus
                    className="h-7"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <Input
                    type="date"
                    value={editValues.date}
                    onChange={(e) =>
                      setEditValues({ ...editValues, date: e.target.value })
                    }
                    onKeyDown={(e) => handleKeyDown(e, todo.id)}
                    className="h-7"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <div className="flex gap-2 justify-end">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditSubmit(todo.id);
                      }}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingId(null);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <CardTitle className={todo.completed ? "line-through" : ""}>
                    {todo.name}
                  </CardTitle>

                  <CardDescription>
                    {formatDisplayDate(todo.date)}
                  </CardDescription>
                </>
              )}
            </div>

            <Button
              variant="ghost"
              className="h-8 w-8 text-gray-500 hover:text-red-500"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(todo.id);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
