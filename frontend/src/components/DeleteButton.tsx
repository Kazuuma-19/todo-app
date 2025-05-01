import type { Todo } from "@/types/todo";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

type DeleteButtonProps = {
  todo: Todo;
  onDelete: (id: string) => void;
};

export function DeleteButton({ todo, onDelete }: DeleteButtonProps) {
  return (
    <>
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
    </>
  );
}
