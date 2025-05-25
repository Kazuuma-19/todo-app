import useSWR from "swr";
import { fetchTodos } from "@/features/inbox/api/inboxTodoApi";

export function useInboxSwr(keyword: string) {
  const { data, error, isLoading, mutate } = useSWR(
    ["/inbox", keyword],
    ([, keyword]) => fetchTodos(keyword),
  );

  return {
    todos: data,
    isLoading,
    isError: error,
    mutate,
  };
}
