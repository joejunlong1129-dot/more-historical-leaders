import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen, waitFor, within } from "@testing-library/react";
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

function createJsonResponse(body, ok = true) {
  return {
    ok,
    json: async () => body,
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
  test("shows Hitler first and one selected leader dossier by default", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: /More Historical Leaders/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Steam Workshop/i })).toHaveAttribute(
      "href",
      "https://steamcommunity.com/sharedfiles/filedetails/?id=3738922774",
    );

    const leaderButtons = screen.getAllByRole("button", { name: /Chiang Kai-shek|Adolf Hitler|Joseph Stalin/i });
    expect(leaderButtons.map((button) => within(button).getByText(/Chiang Kai-shek|Adolf Hitler|Joseph Stalin/i).textContent)).toEqual([
      "Adolf Hitler",
      "Joseph Stalin",
      "Chiang Kai-shek",
    ]);

    const dossier = screen.getByTestId("leader-dossier");
    expect(within(dossier).getByRole("heading", { name: /Adolf Hitler/i })).toBeInTheDocument();
    expect(within(dossier).getByText(/Revanchist Mobilization/i)).toBeInTheDocument();
    expect(within(dossier).queryByText(/high-risk conquest leader/i)).not.toBeInTheDocument();
    expect(within(dossier).queryByText(/Island Commandos/i)).not.toBeInTheDocument();
    expect(screen.getAllByTestId("leader-dossier")).toHaveLength(1);
  });

  test("leader selection replaces the dossier instead of stacking every profile", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /Chiang Kai-shek/i }));

    const dossier = screen.getByTestId("leader-dossier");
    expect(within(dossier).getByRole("heading", { name: /Chiang Kai-shek/i })).toBeInTheDocument();
    expect(within(dossier).getByText(/Island Commandos/i)).toBeInTheDocument();
    expect(within(dossier).queryByText(/Republic of China looks/i)).not.toBeInTheDocument();
    expect(within(dossier).queryByText(/Revanchist Mobilization/i)).not.toBeInTheDocument();
    expect(screen.getAllByTestId("leader-dossier")).toHaveLength(1);
  });

  test("can select Stalin and shows Soviet Union abilities", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /Joseph Stalin/i }));

    const dossier = screen.getByTestId("leader-dossier");
    expect(within(dossier).getByRole("heading", { name: /Joseph Stalin/i })).toBeInTheDocument();
    expect(within(dossier).getByText("Soviet Union")).toBeInTheDocument();
    expect(within(dossier).getByText(/Five-Year Plan/i)).toBeInTheDocument();
    expect(within(dossier).getByText(/additional standard adjacency bonuses/i)).toBeInTheDocument();
    expect(within(dossier).getByText(/Cities with 10 or more Population gain \+10% Science/i)).toBeInTheDocument();
    expect(within(dossier).getByText(/Great Patriotic War/i)).toBeInTheDocument();
    expect(within(dossier).getByText(/Domestic Trade Routes from a city provide the origin city/i)).toBeInTheDocument();
    expect(within(dossier).getByText(/T-34/i)).toBeInTheDocument();
    expect(dossier.querySelector(".civ-emblem")).toHaveAttribute("src", "/assets/flag-soviet.svg");
    expect(within(dossier).queryByText(/Island Commandos/i)).not.toBeInTheDocument();
    expect(screen.getAllByTestId("leader-dossier")).toHaveLength(1);
  });

  test("language toggle switches the visible interface and selected dossier copy", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: copy.zh.code }));

    expect(screen.getByRole("heading", { name: copy.zh.title })).toBeInTheDocument();
    const dossier = screen.getByTestId("leader-dossier");
    expect(within(dossier).getByRole("heading", { name: leaders.find((leader) => leader.id === "hitler").zh.name })).toBeInTheDocument();
    expect(within(dossier).getByText(copy.zh.leaderAbility)).toBeInTheDocument();
  });

  test("hides the visual editor unless edit mode is enabled", () => {
    render(<App />);

    expect(screen.queryByRole("complementary", { name: "Visual editor" })).not.toBeInTheDocument();
  });

  test("loads the published site config for regular visitors", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn((url) => {
        if (url === "/site-config.json") {
          return Promise.resolve(createJsonResponse({ layout: { avatarSize: 144 } }));
        }

        return Promise.resolve(createJsonResponse({}, false));
      }),
    );

    render(<App />);

    await waitFor(() => {
      expect(document.documentElement.style.getPropertyValue("--editor-avatar-size")).toBe("144px");
    });
  });

  test("uses the live comments response instead of seed comments", async () => {
    const fetchMock = vi.fn((url) => {
      if (url === "/api/comments") {
        return Promise.resolve(createJsonResponse({ comments: [] }));
      }

      return Promise.resolve(createJsonResponse({}, false));
    });
    vi.stubGlobal("fetch", fetchMock);

    render(<App />);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledWith("/api/comments"));
    expect(screen.queryByText(/Great addition to the game/i)).not.toBeInTheDocument();
  });

  test("submits a comment through the API and renders the saved row", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn((url, options = {}) => {
      if (url === "/api/comments" && options.method === "POST") {
        return Promise.resolve(
          createJsonResponse({
            comment: {
              id: "server-comment-1",
              name: "Player",
              message: "Great dossier.",
              created_at: "2026-06-12T00:00:00.000Z",
            },
          }),
        );
      }

      if (url === "/api/comments") {
        return Promise.resolve(createJsonResponse({ comments: [] }));
      }

      return Promise.resolve(createJsonResponse({}, false));
    });
    vi.stubGlobal("fetch", fetchMock);

    render(<App />);
    await user.type(screen.getByPlaceholderText("Enter your name"), " Player ");
    await user.type(screen.getByPlaceholderText("Share your thoughts about this mod..."), " Great dossier. ");
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(await screen.findByText("Great dossier.")).toBeInTheDocument();
    expect(screen.getByText("Player")).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/comments",
      expect.objectContaining({
        method: "POST",
      }),
    );
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
