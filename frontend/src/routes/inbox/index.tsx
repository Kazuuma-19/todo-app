import InboxList from "@/features/inbox/InboxList";
import { inboxTodosAtom } from "@/stores/todoAtom";
import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { useSetAtom } from "jotai";
import { useCallback, useEffect } from "react";

import SearchBox from "@/components/SearchBox";

export const Route = createFileRoute("/inbox/")({
  component: InboxIndex,
});

const apiUrl = `${import.meta.env.VITE_BACKEND_API_URL}/inbox`;

function InboxIndex() {
  const setTodos = useSetAtom(inboxTodosAtom);

  const getTodos = useCallback(async () => {
    const response = await axios.get(apiUrl);
    setTodos(response.data);
  }, [setTodos]);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  const handleCreate = async (todo: { name: string; date: string }) => {
    await axios.post(apiUrl, todo);
    getTodos();
  };

  const handleEdit = async (updates: {
    id: string;
    name: string;
    date: string;
  }) => {
    await axios.put(`${apiUrl}/${updates.id}`, {
      name: updates.name,
      date: updates.date,
    });
    getTodos();
  };

  const handleToggleComplete = async (id: string, completed: boolean) => {
    await axios.patch(`${apiUrl}/${id}/completed`, {
      completed,
    });
    getTodos();
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`${apiUrl}/${id}`);
    getTodos();
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Inbox</h1>
        <SearchBox />
      </div>

      <InboxList
        onCreate={handleCreate}
        onEdit={handleEdit}
        onToggleComplete={handleToggleComplete}
        onDelete={handleDelete}
      />
    </>
  );
}
