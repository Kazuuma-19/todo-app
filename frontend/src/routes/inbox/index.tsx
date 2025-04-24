import SearchBox from "@/components/SearchBox";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/inbox/")({
  component: InboxIndex,
});

function InboxIndex() {
  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-2xl font-bold">Inbox</h1>
      <SearchBox />
    </div>
  );
}
