const jsonHeaders = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
};

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: jsonHeaders,
  });
}

function sanitize(value, maxLength) {
  return String(value ?? "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, maxLength);
}

export async function onRequestGet({ env }) {
  const { results } = await env.DB.prepare(
    "SELECT id, name, message, created_at FROM comments ORDER BY created_at DESC LIMIT 50",
  ).all();

  return json({ comments: results ?? [] });
}

export async function onRequestPost({ request, env }) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "Invalid JSON body." }, 400);
  }

  const name = sanitize(payload.name, 40);
  const message = sanitize(payload.message, 500);
  if (!name || !message) {
    return json({ error: "Name and message are required." }, 400);
  }

  const createdAt = new Date().toISOString();
  await env.DB.prepare("INSERT INTO comments (name, message, created_at) VALUES (?, ?, ?)").bind(name, message, createdAt).run();

  return json(
    {
      comment: {
        id: createdAt,
        name,
        message,
        created_at: createdAt,
      },
    },
    201,
  );
}
