import axios from "axios";

const apiUrl = `${import.meta.env.VITE_BACKEND_API_URL}/inbox`;

export const fetchTodos = async () => {
  const response = await axios.get(apiUrl);
  return response.data;
};

export const createTodo = async (todo: { name: string; date: string }) => {
  await axios.post(apiUrl, todo);
};

export const updateTodo = async (updates: {
  id: string;
  name: string;
  date: string;
}) => {
  await axios.put(`${apiUrl}/${updates.id}`, {
    name: updates.name,
    date: updates.date,
  });
};

export const toggleTodoCompleted = async (id: string, completed: boolean) => {
  await axios.patch(`${apiUrl}/${id}/completed`, { completed });
};

export const deleteTodo = async (id: string) => {
  await axios.delete(`${apiUrl}/${id}`);
};
