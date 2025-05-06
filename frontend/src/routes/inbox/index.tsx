import { InboxList } from "@/features/inbox/InboxList";
import { createFileRoute } from "@tanstack/react-router";
import { useInboxTodos } from "@/features/inbox/hooks/useInboxTodos";

import { SearchBox } from "@/components/SearchBox";
import { requireAuth } from "@/lib/requireAuth";

export const Route = createFileRoute("/inbox/")({
  beforeLoad: () => {
    requireAuth();
  },
  component: InboxIndex,
});

function InboxIndex() {
  const { handleCreate, handleEdit, handleToggleComplete, handleDelete } =
    useInboxTodos();

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
