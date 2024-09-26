import { Hono } from "hono";
import { db } from "../db/db";
import { users as usersTable } from "../db/models/users";
import { eq } from "drizzle-orm";

export const usersRoute = new Hono();

usersRoute.get("/:id{[0-9]+}", async (c) => {
  const userId = Number(c.req.param("id"));
  const user = await db
    .select({
      id: usersTable.id,
      username: usersTable.username,
      display_name: usersTable.display_name,
      bio: usersTable.bio,
      avatar_url: usersTable.avatar_url,
      banner_url: usersTable.banner_url,
    })
    .from(usersTable)
    .where(eq(usersTable.id, userId));
  return c.json(user);
});
