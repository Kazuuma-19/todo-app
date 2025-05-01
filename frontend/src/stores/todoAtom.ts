import { atom } from "jotai";
import type { Todo } from "@/types/todo";

export const todosAtom = atom<Todo[]>([]);

export const inboxTodosAtom = atom<Todo[]>([]);
