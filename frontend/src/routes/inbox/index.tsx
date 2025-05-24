import { createFileRoute } from "@tanstack/react-router";
import { requireAuth } from "@/lib/requireAuth";

import { SearchBox } from "@/components/SearchBox";
import { InboxList } from "@/features/inbox/InboxList";

export const Route = createFileRoute("/inbox/")({
  beforeLoad: async () => {
    await requireAuth();
  },
  component: InboxIndex,
});

function InboxIndex() {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Inbox</h1>
        <SearchBox onSearch={() => {}} />
      </div>

      <InboxList />
    </>
  );
}
