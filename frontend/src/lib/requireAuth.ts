import { authUserAtom } from "@/stores/authAtom";
import { redirect } from "@tanstack/react-router";
import { getDefaultStore } from "jotai";
import { axiosInstance } from "./axios";

export const requireAuth = async () => {
  const store = getDefaultStore();
  let user = store.get(authUserAtom);

  if (!user) {
    try {
      const res = await axiosInstance.get("/me");
      user = res.data;
      store.set(authUserAtom, user);
    } catch {
      user = null;
      store.set(authUserAtom, null);
    }
  }

  if (!user) {
    throw redirect({ to: "/login" });
  }
  return user;
};
