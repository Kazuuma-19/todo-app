import { createFileRoute } from "@tanstack/react-router";
import { LoginBox } from "@/features/login/LoginBox";

export const Route = createFileRoute("/login/")({
  component: LoginIndex,
});

function LoginIndex() {
  return <LoginBox />;
}
