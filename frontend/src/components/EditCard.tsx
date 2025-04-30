import { useState } from "react";
import type { Todo } from "@/types/todo";
import { formatDate } from "@/utils/formatDate";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { DeleteButton } from "./DeleteButton";

type EditValues = Omit<Todo, "completed">;
type EditCardProps = {
  todos: Todo[];
  onToggleComplete: (id: string, completed: boolean) => void;
  onEdit: (updates: EditValues) => void;
  onDelete: (id: string) => void;
};

export function EditCard({
  todos,
  onToggleComplete,
  onEdit,
  onDelete,
}: EditCardProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editValues, setEditValues] = useState<EditValues>({
    id: "",
    name: "",
    date: "",
  });

  const handleEditClick = (todo: Todo) => {
    if (todo.completed) {
      return;
    }
    setIsEditing(true);
    setEditValues({
      id: todo.id,
      name: todo.name,
      date: formatDate(todo.date),
    });
  };

  const handleEditSubmit = () => {
    onEdit({
      id: editValues.id,
      name: editValues.name,
      date: `${editValues.date}T00:00:00`,
    });
    setIsEditing(false);
  };

  const handleEditKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleEditSubmit();
    } else if (e.key === "Escape") {
      setIsEditing(false);
    }
  };

  return (
    <>
      {todos.map((todo) => (
        <div
          key={todo.id}
          className={cn(
            todo.completed ? "opacity-60" : "cursor-pointer hover:bg-gray-50",
            isEditing && editValues.id === todo.id && "bg-gray-50",
            "flex items-center justify-between space-x-4 p-3 rounded-lg",
          )}
          onClick={() => handleEditClick(todo)}
        >
          {isEditing && editValues.id === todo.id ? (
            <div className="flex-1 space-y-2 p-2">
              <Input
                value={editValues.name}
                className="h-7"
                onChange={(e) =>
                  setEditValues({ ...editValues, name: e.target.value })
                }
                onKeyDown={handleEditKeyDown}
                onClick={(e) => e.stopPropagation()}
                autoFocus
              />
              <Input
                type="date"
                value={editValues.date}
                className="h-7"
                onChange={(e) => {
                  setEditValues({ ...editValues, date: e.target.value });
                }}
                onKeyDown={handleEditKeyDown}
                onClick={(e) => e.stopPropagation()}
              />

              <div className="flex items-center justify-end gap-2">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditSubmit();
                  }}
                >
                  Save
                </Button>

                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Checkbox
                checked={todo.completed}
                onCheckedChange={(checked) => {
                  onToggleComplete(todo.id, Boolean(checked));
                }}
                onClick={(e) => e.stopPropagation()}
              />

              <div>
                <div
                  className={cn("font-bold", todo.completed && "line-through")}
                >
                  {todo.name}
                </div>

                <div className="text-sm text-muted-foreground">
                  {formatDate(todo.date)}
                </div>
              </div>
            </div>
          )}

          <DeleteButton todo={todo} onDelete={onDelete} />
        </div>
      ))}
    </>
  );
}
