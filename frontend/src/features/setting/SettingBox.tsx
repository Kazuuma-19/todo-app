import { useAtomValue } from "jotai";
import { authUserAtom } from "@/stores/authAtom";
import { useNavigate } from "@tanstack/react-router";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ConfirmDialog } from "@/components/ConfirmDialog";

export function SettingBox() {
  const user = useAtomValue(authUserAtom);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate({ to: "/login" });
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <Card className="rounded-xl shadow-md">
        <CardContent className="p-6 space-y-6">
          <div>
            <Label>ユーザー名</Label>
            <p className="mt-1 text-gray-700">{user?.name}</p>
          </div>

          <div>
            <Label>メールアドレス</Label>
            <p className="mt-1 text-gray-700">{user?.email}</p>
          </div>

          <ConfirmDialog
            triggerLabel="ログアウト"
            title="本当にログアウトしてもよろしいですか？"
            description="ログアウト後はログイン画面に遷移します。"
            confirmLabel="ログアウト"
            onConfirm={handleLogout}
          />
        </CardContent>
      </Card>
    </>
  );
}
