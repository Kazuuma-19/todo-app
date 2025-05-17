import { http, HttpResponse } from "msw";

const todos = [{ id: "1", name: "勉強", date: "2024-05-01", completed: false }];

const apiUrl = "http://localhost:8080/todos";

export const todayHandlers = [
  http.get(apiUrl, () => {
    return HttpResponse.json(todos);
  }),

  http.post(apiUrl, async ({ request }: { request: Request }) => {
    const newTodo = await request.json();
    const created = {
      ...newTodo,
      id: Date.now().toString(),
      completed: false,
    };
    todos.push(created);
    return HttpResponse.json(created, { status: 201 });
  }),
];
