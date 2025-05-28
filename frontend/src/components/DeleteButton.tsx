import type { Todo } from "@/types/todo";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "./ConfirmDialog";

type DeleteButtonProps = {
  todo: Todo;
  onDelete: (id: string) => void;
};

export function DeleteButton({ todo, onDelete }: DeleteButtonProps) {
  return (
    <>
      <ConfirmDialog
        trigger={
          <Button
            variant="ghost"
            className="h-8 w-8 text-gray-500 hover:text-red-500"
            onClick={(e) => e.stopPropagation()}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        }
        title="本当に削除してもよろしいですか？"
        description="削除後は元に戻すことはできません。"
        confirmLabel="削除"
        onConfirm={() => onDelete(todo.id)}
      />
    </>
  );
}
