import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";

export const Route = createFileRoute("/login/")({
  component: LoginIndex,
});

function LoginIndex() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/login", { email, password });
      localStorage.setItem("token", res.data);
      navigate({ to: "/", replace: true }); // replace: ブラウザバックを無効化
    } catch (err) {
      toast.error("ログインに失敗しました");
    }
  };

  return (
    <>
      <Card className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-8">
        <CardHeader>
          <CardTitle className="text-center text-2xl">ログイン</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="password">パスワード</Label>
              <Input
                id="password"
                type="password"
                placeholder="パスワードを入力してください"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              ログイン
            </Button>

            <div className="text-right">
              <Button
                variant="link"
                className="p-0"
                onClick={() => navigate({ to: "/register" })}
              >
                新規登録はこちらから
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Toaster />
    </>
  );
}
