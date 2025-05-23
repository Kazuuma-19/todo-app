import useSWR from "swr";
import { fetchTodos } from "@/features/today/api/todayTodoApi";

export function useTodaySwr(keyword: string) {
  const { data, error, isLoading, mutate } = useSWR(
    ["/todos", keyword],
    ([, keyword]) => fetchTodos(keyword),
  );

  return {
    todos: data,
    isLoading,
    isError: error,
    mutate,
  };
}
