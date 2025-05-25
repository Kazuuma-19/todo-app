import { http, HttpResponse } from "msw";

const todos = [{ id: "1", name: "勉強", date: "2024-05-01", completed: false }];

const apiUrl = "http://localhost:8080/inbox";

export const inboxHandlers = [
  http.get(apiUrl, ({ request }) => {
    const url = new URL(request.url);
    const keyword = url.searchParams.get("q");

    if (keyword) {
      return HttpResponse.json(
        todos.filter((todo) => todo.name.includes(keyword)),
      );
    }
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
