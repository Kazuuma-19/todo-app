import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";

import { axiosInstance } from "@/lib/axios";
import { Label } from "@radix-ui/react-label";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/register/")({
  component: RegisterIndex,
});

function RegisterIndex() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axiosInstance.post("/register", { name, email, password });
      navigate({ to: "/login", replace: true }); // replace: ブラウザバックを無効化
    } catch (err) {
      toast.error("登録に失敗しました");
    }
  };

  return (
    <>
      <Card className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-8">
        <CardHeader>
          <CardTitle className="text-center text-2xl">新規登録</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col space-y-1">
              <Label htmlFor="name">名前</Label>
              <Input
                id="name"
                type="text"
                placeholder="お名前を入力してください"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col space-y-1">
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

            <div className="flex flex-col space-y-1">
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
              登録
            </Button>

            <div className="text-right">
              <Button
                variant="link"
                className="p-0"
                onClick={() => navigate({ to: "/login" })}
              >
                ログインはこちらから
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Toaster />
    </>
  );
}
