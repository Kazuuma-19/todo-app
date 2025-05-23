import { axiosInstance } from "@/lib/axios";
import type { Todo } from "@/types/todo";

const apiUrl = `${import.meta.env.VITE_BACKEND_API_URL}/todos`;

export const fetchTodos = async (keyword: string): Promise<Todo[]> => {
  const response = await axiosInstance.get(apiUrl, {
    params: {
      q: keyword,
    },
  });
  return response.data;
};

export const createTodo = async (todo: { name: string; date: string }) => {
  await axiosInstance.post(apiUrl, todo);
};

export const updateTodo = async (updates: {
  id: string;
  name: string;
  date: string;
}) => {
  await axiosInstance.put(`${apiUrl}/${updates.id}`, {
    name: updates.name,
    date: updates.date,
  });
};

export const toggleTodoCompleted = async (id: string, completed: boolean) => {
  await axiosInstance.patch(`${apiUrl}/${id}/completed`, { completed });
};

export const deleteTodo = async (id: string) => {
  await axiosInstance.delete(`${apiUrl}/${id}`);
};
