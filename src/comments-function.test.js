import { describe, expect, test, vi } from "vitest";
import { onRequestGet, onRequestPost } from "../functions/api/comments.js";

function createDb(initialRows = []) {
  const rows = [...initialRows];
  const db = {
    prepare: vi.fn(() => ({
      bind: vi.fn((...values) => ({
        all: vi.fn(async () => ({ results: rows })),
        run: vi.fn(async () => {
          rows.unshift({
            id: "generated-id",
            name: values[0],
            message: values[1],
            created_at: "2026-06-11T00:00:00.000Z",
          });
          return { success: true };
        }),
      })),
      all: vi.fn(async () => ({ results: rows })),
    })),
  };
  return { db, rows };
}

describe("comments Pages Function", () => {
  test("GET returns comments from D1 in JSON", async () => {
    const { db } = createDb([{ id: "1", name: "Tester", message: "Useful mod.", created_at: "2026-06-10" }]);

    const response = await onRequestGet({ env: { DB: db } });
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.comments).toHaveLength(1);
    expect(body.comments[0].name).toBe("Tester");
  });

  test("POST rejects empty comment data", async () => {
    const { db } = createDb();
    const request = new Request("https://example.com/api/comments", {
      method: "POST",
      body: JSON.stringify({ name: " ", message: "" }),
    });

    const response = await onRequestPost({ request, env: { DB: db } });
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toMatch(/name and message/i);
    expect(db.prepare).not.toHaveBeenCalled();
  });

  test("POST trims and persists a valid comment", async () => {
    const { db, rows } = createDb();
    const request = new Request("https://example.com/api/comments", {
      method: "POST",
      body: JSON.stringify({ name: "  Player  ", message: "  Great dossier.  " }),
    });

    const response = await onRequestPost({ request, env: { DB: db } });
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(rows[0]).toMatchObject({ name: "Player", message: "Great dossier." });
    expect(body.comment).toMatchObject({ name: "Player", message: "Great dossier." });
  });
});
