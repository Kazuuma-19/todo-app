import useSWR from "swr";
import { fetchTodos } from "@/features/inbox/api/inboxTodoApi";

export function useInboxSwr() {
  const { data, error, isLoading, mutate } = useSWR("/inbox", fetchTodos);

  return {
    todos: data,
    isLoading,
    isError: error,
    mutate,
  };
}
