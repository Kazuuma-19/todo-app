import { SettingBox } from "@/features/setting/SettingBox";
import { requireAuth } from "@/lib/requireAuth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/settings/")({
  beforeLoad: async () => {
    await requireAuth();
  },
  component: SettingsIndex,
});

function SettingsIndex() {
  return <SettingBox />;
}
