import { RegisterBox } from "@/features/register/RegisterBox";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/register/")({
  component: RegisterIndex,
});

function RegisterIndex() {
  return <RegisterBox />;
}
