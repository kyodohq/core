import app from "./app";

Bun.serve({
  fetch: app.fetch,
});

console.log("server running at http://localhost:3000");
