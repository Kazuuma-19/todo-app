import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { TodoList } from "../TodoList";
import { SWRConfig } from "swr";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>
);

describe("TodoList integration with MSW", () => {
  it("タスクを追加するとリストに表示される", async () => {
    const user = userEvent.setup();

    render(<TodoList />, { wrapper });
    expect(await screen.findByText("勉強")).toBeInTheDocument();

    // タスクを追加
    await user.click(screen.getByText("Add Task"));
    await user.type(screen.getByPlaceholderText("Task name"), "買い物");
    await user.click(screen.getByRole("button", { name: "Add" }));

    // 新しく追加されたタスクが表示されることを確認
    expect(await screen.findByText("買い物")).toBeInTheDocument();
  });

  it("検索ボックスでEnterキーを押すとキーワードに部分一致するタスクが表示される", async () => {
    const user = userEvent.setup();

    render(<TodoList />, { wrapper });

    // タスクを追加
    await user.click(screen.getByText("Add Task"));
    await user.type(screen.getByPlaceholderText("Task name"), "検索用タスク");
    await user.click(screen.getByRole("button", { name: "Add" }));

    // 表示されないタスク
    await user.click(screen.getByText("Add Task"));
    await user.type(screen.getByPlaceholderText("Task name"), "失敗用タスク");
    await user.click(screen.getByRole("button", { name: "Add" }));

    expect(await screen.findByText("検索用タスク")).toBeInTheDocument();
    expect(await screen.findByText("失敗用タスク")).toBeInTheDocument();

    // 検索ボックスにキーワードを入力
    await user.type(screen.getByPlaceholderText("Search..."), "検索");

    // キーワードに部分一致するタスクが表示されることを確認(デバウンスのため待つ:最大1000ms)
    await waitFor(() => {
      expect(screen.getByText("検索用タスク")).toBeInTheDocument();
      expect(screen.queryByText("失敗用タスク")).not.toBeInTheDocument();
    });
  });
});
