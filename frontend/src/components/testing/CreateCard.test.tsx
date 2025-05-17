import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CreateCard } from "../CreateCard";

describe("CreateCard", () => {
  it("初期状態ではAdd Taskが表示される", () => {
    render(<CreateCard onCreate={vi.fn()} />);
    expect(screen.getByText("Add Task")).toBeInTheDocument();
  });

  it("Add Taskをクリックすると入力フォームが表示される", async () => {
    render(<CreateCard onCreate={vi.fn()} />);
    await userEvent.click(screen.getByText("Add Task"));

    expect(screen.queryByText("Add Task")).not.toBeInTheDocument();
    expect(screen.getByPlaceholderText("Task name")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
  });

  it("AddボタンをクリックするとonCreateが呼ばれる", async () => {
    const mockOnCreate = vi.fn();
    render(<CreateCard onCreate={mockOnCreate} />);

    await userEvent.click(screen.getByText("Add Task"));
    await userEvent.type(screen.getByPlaceholderText("Task name"), "買い物");

    await userEvent.click(screen.getByRole("button", { name: "Add" }));
    expect(mockOnCreate).toHaveBeenCalledTimes(1);
    expect(mockOnCreate.mock.calls[0][0].name).toBe("買い物");
    expect(mockOnCreate.mock.calls[0][0].date).toMatch(/T00:00:00/);
  });

  it("Cancelボタンを押すとフォームが閉じる", async () => {
    render(<CreateCard onCreate={vi.fn()} />);
    await userEvent.click(screen.getByText("Add Task"));
    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(screen.queryByPlaceholderText("Task name")).not.toBeInTheDocument();
  });
});
