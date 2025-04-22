import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus } from "lucide-react";
import { useState } from "react";
import type { Todo } from "@/types/todo";
import { formatDateForInput } from "@/utils/formatDate";

type TodoListProps = {
  todos: Todo[];
  onToggleComplete: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (updates: { id: string; name: string; date: string }) => void;
  onCreate: (todo: { name: string; date: string }) => void;
};

export function TodoList({
  todos,
  onToggleComplete,
  onDelete,
  onEdit,
  onCreate,
}: TodoListProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editValues, setEditValues] = useState<{
    id: string;
    name: string;
    date: string;
  }>({
    id: "",
    name: "",
    date: "",
  });
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [newTodo, setNewTodo] = useState<{ name: string; date: string }>({
    name: "",
    date: formatDateForInput(new Date().toISOString()),
  });

  const handleEditClick = (todo: Todo) => {
    setIsEditing(true);
    setEditValues({
      id: todo.id,
      name: todo.name,
      date: formatDateForInput(todo.date),
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

  const handleCreateSubmit = () => {
    onCreate({
      name: newTodo.name,
      date: `${newTodo.date}T00:00:00`,
    });
    setIsCreating(false);
    setNewTodo({
      name: "",
      date: formatDateForInput(new Date().toISOString()),
    });
  };

  const handleEditKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleEditSubmit();
    } else if (e.key === "Escape") {
      setIsEditing(false);
    }
  };

  const handleCreateKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCreateSubmit();
    } else if (e.key === "Escape") {
      setIsCreating(false);
    }
  };

  return (
    <>
      <div className="space-y-4 h-[calc(100vh-260px)] overflow-y-auto">
        {todos.map((todo) => (
          <Card
            key={todo.id}
            className={`${
              todo.completed ? "opacity-60" : ""
            } cursor-pointer hover:bg-gray-50`}
            onClick={() => handleEditClick(todo)}
          >
            <CardHeader className="flex items-center space-x-4">
              {isEditing && editValues.id === todo.id ? (
                <div className="flex-1 space-y-2">
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
                <>
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={(checked) => {
                      onToggleComplete(todo.id, Boolean(checked));
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />

                  <CardTitle className={todo.completed ? "line-through" : ""}>
                    {todo.name}
                  </CardTitle>

                  <CardDescription>
                    {formatDateForInput(todo.date)}
                  </CardDescription>
                </>
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
            </CardHeader>
          </Card>
        ))}
      </div>

      {isCreating ? (
        <Card>
          <CardHeader className="flex items-center space-x-4">
            <div className="flex-1 space-y-2">
              <Input
                value={newTodo.name}
                className="h-7"
                placeholder="Task name"
                onChange={(e) =>
                  setNewTodo({ ...newTodo, name: e.target.value })
                }
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
          </CardHeader>
        </Card>
      ) : (
        <div
          className="flex items-center space-x-2 my-6 p-4 rounded-lg cursor-pointer hover:bg-gray-50"
          onClick={() => setIsCreating(true)}
          onKeyDown={(e) => {
            // TODO: 設定する
            if (e.key === "Enter") {
              setIsCreating(true);
            }
          }}
        >
          <Plus className="h-4 w-4" />
          <CardTitle>Add Task</CardTitle>
        </div>
      )}
    </>
  );
}
