import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, test } from "vitest";
import { App } from "./App.jsx";

afterEach(() => {
  cleanup();
});

describe("More Historical Leaders page", () => {
  test("shows one selected leader dossier by default", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: /More Historical Leaders/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Steam Workshop/i })).toHaveAttribute(
      "href",
      "https://steamcommunity.com/sharedfiles/filedetails/?id=3738922774",
    );

    const dossier = screen.getByTestId("leader-dossier");
    expect(within(dossier).getByRole("heading", { name: /Chiang Kai-shek/i })).toBeInTheDocument();
    expect(within(dossier).getByText(/Island Commandos/i)).toBeInTheDocument();
    expect(within(dossier).queryByText(/Revanchist Mobilization/i)).not.toBeInTheDocument();
    expect(screen.getAllByTestId("leader-dossier")).toHaveLength(1);
  });

  test("leader selection replaces the dossier instead of stacking every profile", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /Adolf Hitler/i }));

    const dossier = screen.getByTestId("leader-dossier");
    expect(within(dossier).getByRole("heading", { name: /Adolf Hitler/i })).toBeInTheDocument();
    expect(within(dossier).getByText(/Revanchist Mobilization/i)).toBeInTheDocument();
    expect(within(dossier).queryByText(/Island Commandos/i)).not.toBeInTheDocument();
    expect(screen.getAllByTestId("leader-dossier")).toHaveLength(1);
  });

  test("language toggle switches the visible interface and selected dossier copy", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "中文" }));

    expect(screen.getByRole("heading", { name: "更多历史领袖" })).toBeInTheDocument();
    const dossier = screen.getByTestId("leader-dossier");
    expect(within(dossier).getByRole("heading", { name: "蒋介石" })).toBeInTheDocument();
    expect(within(dossier).getByText("领袖能力")).toBeInTheDocument();
    expect(within(dossier).getByText(/海岛奇兵/)).toBeInTheDocument();
  });
});
