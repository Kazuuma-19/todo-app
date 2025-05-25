import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SWRConfig } from "swr";
import { InboxList } from "../InboxList";
import { describe, it, expect } from "vitest";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>
);

describe("Inbox List", () => {
  const setup = () => {
    const user = userEvent.setup();
    render(<InboxList />, { wrapper });
    return { user };
  };

  it("タスクを追加すると、リストに表示される", async () => {
    const { user } = setup();

    expect(await screen.findByText("勉強")).toBeInTheDocument();

    await user.click(screen.getByText("Add Task"));
    await user.type(screen.getByPlaceholderText("Task name"), "買い物");
    await user.click(screen.getByRole("button", { name: "Add" }));

    expect(await screen.findByText("買い物")).toBeInTheDocument();
  });

  it("キーワードで検索をすると、該当するタスクが表示される", async () => {
    const { user } = setup();

    // タスクの追加
    await user.click(screen.getByText("Add Task"));
    await user.type(screen.getByPlaceholderText("Task name"), "検索タスク");
    await user.click(screen.getByRole("button", { name: "Add" }));

    await user.click(screen.getByText("Add Task"));
    await user.type(screen.getByPlaceholderText("Task name"), "失敗用タスク");
    await user.click(screen.getByRole("button", { name: "Add" }));

    // 検索ボックスにキーワードを入力
    await user.type(screen.getByPlaceholderText("Search..."), "検索");

    // キーワードに部分一致するタスクが表示されることを確認(デバウンスのため待つ:最大1000ms)
    await waitFor(() => {
      expect(screen.getByText("検索タスク")).toBeInTheDocument();
      expect(screen.queryByText("失敗用タスク")).not.toBeInTheDocument();
    });
  });
});
