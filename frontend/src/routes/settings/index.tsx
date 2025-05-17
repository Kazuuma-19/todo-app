import { requireAuth } from "@/lib/requireAuth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/settings/")({
  beforeLoad: async () => {
    await requireAuth();
  },
  component: SettingsIndex,
});

function SettingsIndex() {
  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-2xl font-bold">Settings</h1>
    </div>
  );
}
