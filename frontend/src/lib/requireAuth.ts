import { authUserAtom } from "@/stores/authAtom";
import { redirect } from "@tanstack/react-router";
import { getDefaultStore } from "jotai";

export const requireAuth = () => {
  const store = getDefaultStore();
  const user = store.get(authUserAtom);

  if (!user) {
    throw redirect({ to: "/login" });
  }
  return user;
};
