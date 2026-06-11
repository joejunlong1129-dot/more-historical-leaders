import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { App } from "./App.jsx";
import { copy, leaders } from "./content.js";

function createFileReaderMock(result) {
  return class {
    readAsDataURL() {
      this.result = result;
      this.onload?.();
    }
  };
}

beforeEach(() => {
  localStorage.clear();
  window.history.replaceState({}, "", "/");
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
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

    await user.click(screen.getByRole("button", { name: copy.zh.code }));

    expect(screen.getByRole("heading", { name: copy.zh.title })).toBeInTheDocument();
    const dossier = screen.getByTestId("leader-dossier");
    expect(within(dossier).getByRole("heading", { name: leaders[0].zh.name })).toBeInTheDocument();
    expect(within(dossier).getByText(copy.zh.leaderAbility)).toBeInTheDocument();
  });

  test("hides the visual editor unless edit mode is enabled", () => {
    render(<App />);

    expect(screen.queryByRole("complementary", { name: "Visual editor" })).not.toBeInTheDocument();
  });

  test("edit mode adjusts avatar size and exports the current config", async () => {
    const user = userEvent.setup();
    window.history.replaceState({}, "", "/?edit=1");
    render(<App />);

    expect(screen.getByRole("complementary", { name: "Visual editor" })).toBeInTheDocument();
    const avatarSize = screen.getByLabelText("Avatar size");
    await user.clear(avatarSize);
    await user.type(avatarSize, "132");

    expect(document.documentElement.style.getPropertyValue("--editor-avatar-size")).toBe("132px");

    await user.click(screen.getByRole("button", { name: "Export config" }));
    const output = screen.getByLabelText("Exported site-config.json");
    expect(output.value).toContain('"avatarSize": 132');
  });

  test("edit mode uploads a replacement background image", async () => {
    const user = userEvent.setup();
    vi.stubGlobal("FileReader", createFileReaderMock("data:image/png;base64,replacement"));
    window.history.replaceState({}, "", "/?edit=1");
    render(<App />);

    const backgroundInput = screen.getByLabelText("Background image");
    await user.upload(backgroundInput, new File(["image"], "background.png", { type: "image/png" }));

    expect(document.documentElement.style.getPropertyValue("--editor-background-image")).toContain(
      "data:image/png;base64,replacement",
    );
  });
});
