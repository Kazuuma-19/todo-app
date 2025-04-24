import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/inbox")({
  component: Inbox,
});

function Inbox() {
  return (
    <div className="p-2">
      <h3>Inbox</h3>
    </div>
  );
}
