import { Hono } from "hono";
import { logger } from "hono/logger";
import { usersRoute } from "./routes/users";
import { authRoute } from "./routes/auth";

const app = new Hono().basePath("/api/v1");

app.use("*", logger());

app.get("/", async (c) => {
  return c.json({ message: "Hello from app!" });
});

app.route("/users", usersRoute);
app.route("/auth", authRoute);

export default app;
