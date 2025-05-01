import useSWR from "swr";
import { fetchTodos } from "@/features/today/api/todayTodoApi";

export function useTodaySwr() {
  const { data, error, isLoading, mutate } = useSWR("/todos", fetchTodos);

  return {
    todos: data,
    isLoading,
    isError: error,
    mutate,
  };
}
