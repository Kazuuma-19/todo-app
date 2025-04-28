import { Checkbox } from "@/components/ui/checkbox";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus } from "lucide-react";
import { useState } from "react";
import type { Todo } from "@/types/todo";
import { addTimeToDateString, formatDate } from "@/utils/formatDate";
import { cn } from "@/lib/utils";
import { inboxTodosAtom } from "@/stores/todoAtom";
import { useAtomValue } from "jotai";

type TodoListProps = {
  onToggleComplete: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (updates: { id: string; name: string; date: string }) => void;
  onCreate: (todo: { name: string; date: string }) => void;
};

type EditValues = Omit<Todo, "completed">;
type NewTodo = Omit<Todo, "id" | "completed">;

export function InboxList({
  onCreate,
  onToggleComplete,
  onEdit,
  onDelete,
}: TodoListProps) {
  const todos = useAtomValue(inboxTodosAtom);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editValues, setEditValues] = useState<EditValues>({
    id: "",
    name: "",
    date: "",
  });
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [newTodo, setNewTodo] = useState<NewTodo>({
    name: "",
    date: formatDate(new Date().toISOString()),
  });

  const handleCreateSubmit = () => {
    onCreate({
      name: newTodo.name,
      date: addTimeToDateString(newTodo.date),
    });
    setIsCreating(false);
    setNewTodo({
      name: "",
      date: formatDate(new Date().toISOString()),
    });
  };

  const handleCreateKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCreateSubmit();
    } else if (e.key === "Escape") {
      setIsCreating(false);
    }
  };

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
                <CardTitle className={todo.completed ? "line-through" : ""}>
                  {todo.name}
                </CardTitle>

                <CardDescription>{formatDate(todo.date)}</CardDescription>
              </div>
            </div>
          )}

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
        </div>
      ))}

      {isCreating ? (
        <div className="space-y-2 mt-4 p-5 rounded-lg  bg-gray-50">
          <Input
            value={newTodo.name}
            className="h-7"
            placeholder="Task name"
            onChange={(e) => setNewTodo({ ...newTodo, name: e.target.value })}
            onKeyDown={handleCreateKeyDown}
            onClick={(e) => e.stopPropagation()}
            autoFocus
          />
          <Input
            type="date"
            value={newTodo.date}
            className="h-7"
            onChange={(e) => {
              setNewTodo({ ...newTodo, date: e.target.value });
            }}
            onKeyDown={handleCreateKeyDown}
            onClick={(e) => e.stopPropagation()}
          />

          <div className="flex items-center justify-end gap-2">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleCreateSubmit();
              }}
            >
              Add
            </Button>

            <Button
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                setIsCreating(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div
          className="flex items-center space-x-2 mt-4 p-3 rounded-lg cursor-pointer hover:bg-gray-50"
          onClick={() => setIsCreating(true)}
        >
          <Plus className="h-4 w-4" />
          <CardTitle>Add Task</CardTitle>
        </div>
      )}
    </>
  );
}
