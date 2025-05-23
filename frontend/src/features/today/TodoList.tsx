import { Toaster } from "sonner";
import { SearchBox } from "@/components/SearchBox";
import { CreateCard } from "@/components/CreateCard";
import { EditCard } from "@/components/EditCard";

import { useTodaySwr } from "./hooks/useTodaySwr";
import { useTodayTodos } from "./hooks/useTodayTodos";
import { useState } from "react";

export function TodoList() {
  const [keyword, setKeyword] = useState("");
  const { todos } = useTodaySwr(keyword);
  const { handleCreate, handleEdit, handleToggleComplete, handleDelete } =
    useTodayTodos();

  const onSearch = (keyword: string) => {
    setKeyword(keyword);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Today</h1>
        <SearchBox onSearch={onSearch} />
      </div>

      <EditCard
        todos={todos}
        onEdit={handleEdit}
        onToggleComplete={handleToggleComplete}
        onDelete={handleDelete}
      />

      <CreateCard onCreate={handleCreate} />

      <Toaster />
    </>
  );
}
