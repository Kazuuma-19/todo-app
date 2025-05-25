import { createFileRoute } from "@tanstack/react-router";
import { requireAuth } from "@/lib/requireAuth";

import { InboxList } from "@/features/inbox/InboxList";

export const Route = createFileRoute("/inbox/")({
  beforeLoad: async () => {
    await requireAuth();
  },
  component: InboxIndex,
});

function InboxIndex() {
  return <InboxList />;
}
