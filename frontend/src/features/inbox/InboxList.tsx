import { useState } from "react";
import { useInboxSwr } from "./hooks/useInboxSwr";
import { useInboxTodos } from "./hooks/useInboxTodos";

import { CreateCard } from "@/components/CreateCard";
import { EditCard } from "@/components/EditCard";
import { Toaster } from "sonner";
import { SearchBox } from "@/components/SearchBox";

export function InboxList() {
  const [keyword, setKeyword] = useState("");
  const { todos } = useInboxSwr(keyword);
  const { handleCreate, handleEdit, handleToggleComplete, handleDelete } =
    useInboxTodos(keyword);

  const onSearch = (keyword: string) => {
    setKeyword(keyword);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Inbox</h1>
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
