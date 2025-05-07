import { authUserAtom } from "@/stores/authAtom";
import { redirect } from "@tanstack/react-router";
import { getDefaultStore } from "jotai";
import { axiosInstance } from "./axios";

export const requireAuth = async () => {
  const store = getDefaultStore();
  try {
    const res = await axiosInstance.get("/me");
    store.set(authUserAtom, res.data);
  } catch {
    store.set(authUserAtom, null);
    throw redirect({ to: "/login" });
  }
};
