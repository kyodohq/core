import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import {
  checkPinSchema,
  checkEmailSchema,
  createUserSchema,
} from "../schemas/users";
import { users as usersTable } from "../db/models/users";
import { db } from "../db/db";
import { eq } from "drizzle-orm";
import { redis } from "../db/redis";
import { verifyPinEmail } from "../emails/verifyPin";
import { generatePin } from "../utils/pin";

export const authRoute = new Hono();

const ENVIRONMENT = process.env.NODE_ENV;

authRoute.post(
  "/signup/verify-email",
  zValidator("json", checkEmailSchema),
  async (c) => {
    const user = c.req.valid("json");

    const result = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, user.email));
    const userFromDb = result[0];

    if (userFromDb) {
      return c.json({ error: "Already exist" }, 401);
    }

    if (ENVIRONMENT === "production") {
      const pin = generatePin();
      await redis.set(pin, user.email, { EX: 300 });
      const response = await verifyPinEmail(user.email, pin);

      if (response.error) {
        redis.del(pin);
        return c.json({ error: "Email could not be sent" }, 500);
      }
    }

    return c.json({ message: "Email sent successfully" });
  },
);

authRoute.post(
  "/signup/verify-code",
  zValidator("json", checkPinSchema),
  async (c) => {
    const data = c.req.valid("json");
    if (ENVIRONMENT === "production") {
      const email = await redis.get(data.pin);

      if (!email || email !== data.email) {
        return c.json({ error: "Invalid pin" }, 401);
      }
      redis.del(data.pin);
    }

    return c.json({ message: "Code verified successfully" });
  },
);

authRoute.post("/signup", zValidator("json", createUserSchema), async (c) => {
  const user = c.req.valid("json");

  const result = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.username, user.username));
  const userFromDb = result[0];
  if (userFromDb) {
    return c.json({ error: "Already exists" }, 401);
  }

  const res = await db.insert(usersTable).values(user).returning({
    id: usersTable.id,
    username: usersTable.username,
    display_name: usersTable.display_name,
    email: usersTable.email,
  });
  const newUser = res[0];

  const sessionId = crypto.randomUUID();
  await redis.set(sessionId, newUser.id, {
    EX: 60 * 60 * 24 * 30,
  });

  return c.json({
    user: newUser,
    session_id: sessionId,
  });
});

authRoute.post(
  "/signin/verify-email",
  zValidator("json", checkEmailSchema),
  async (c) => {
    const user = c.req.valid("json");

    const result = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, user.email));
    const userFromDb = result[0];

    if (!userFromDb) {
      return c.json({ error: "User not found" }, 404);
    }

    if (ENVIRONMENT === "production") {
      const pin = generatePin();
      await redis.set(pin, user.email, { EX: 300 });
      const response = await verifyPinEmail(user.email, pin);

      if (response.error) {
        redis.del(pin);
        return c.json({ error: "Email could not be sent" }, 500);
      }
    }

    return c.json({ message: "Email sent successfully" });
  },
);

authRoute.post(
  "/signin/verify-code",
  zValidator("json", checkPinSchema),
  async (c) => {
    const data = c.req.valid("json");

    if (ENVIRONMENT === "production") {
      const email = await redis.get(data.pin);
      if (!email || email !== data.email) {
        return c.json({ error: "Invalid pin" }, 401);
      }
      redis.del(data.pin);
    }

    const result = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, data.email));
    const userFromDb = result[0];

    const sessionId = crypto.randomUUID();
    await redis.set(sessionId, userFromDb.id, {
      EX: 60 * 60 * 24 * 30,
    });

    return c.json({
      user: userFromDb,
      session_id: sessionId,
    });
  },
);

authRoute.post("/me", async (c) => {
  const sessionId = c.req.header("Authorization");
  if (!sessionId) {
    return c.json({ error: "Session expired" }, 401);
  }

  const id = await redis.get(sessionId);
  if (!id) {
    return c.json({ error: "Session expired" }, 401);
  }

  const userFromDb = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, +id));

  return c.json(userFromDb);
});

authRoute.post("/verify-username", async (c) => {
  const username = await c.req.text();
  if (!username) {
    return c.text("Unavailable", { status: 401 });
  }

  const result = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.username, username));
  const userFromDb = result[0];

  if (userFromDb) {
    return c.text("Unavailable", { status: 401 });
  }

  return c.text("Available");
});
