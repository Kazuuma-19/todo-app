import { Plus } from "lucide-react";
import { useState } from "react";
import type { Todo } from "@/types/todo";
import { addTimeToDateString, formatDate } from "@/utils/formatDate";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type NewTodo = Omit<Todo, "id" | "completed">;
type CreateTaskCardProps = {
  onCreate: (todo: NewTodo) => void;
};

export function CreateCard({ onCreate }: Readonly<CreateTaskCardProps>) {
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

  return (
    <>
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
        <button
          type="button"
          className="flex items-center space-x-2 mt-4 p-3 w-full rounded-lg cursor-pointer hover:bg-gray-50"
          onClick={() => setIsCreating(true)}
        >
          <Plus className="h-4 w-4" />
          <div className="font-bold">Add Task</div>
        </button>
      )}
    </>
  );
}
