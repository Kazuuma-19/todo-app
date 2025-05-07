import { atom } from "jotai";

export type AuthUser = {
  id: number;
  name: string;
  email: string;
};

export const authUserAtom = atom<AuthUser | null>(null);
