import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SWRConfig } from "swr";
import { InboxList } from "../InboxList";
import { describe, it, expect } from "vitest";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>
);

describe("Inbox List", () => {
  it("タスクを追加すると、リストに表示される", async () => {
    const user = userEvent.setup();

    render(<InboxList />, { wrapper });
    expect(await screen.findByText("勉強")).toBeInTheDocument();

    await user.click(screen.getByText("Add Task"));
    await user.type(screen.getByPlaceholderText("Task name"), "買い物");
    await user.click(screen.getByRole("button", { name: "Add" }));

    expect(await screen.findByText("買い物")).toBeInTheDocument();
  });
});
