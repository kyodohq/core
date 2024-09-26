import {
  pgTable,
  serial,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    username: varchar("username", { length: 32 }).unique().notNull(),
    display_name: varchar("display_name", { length: 32 }).notNull(),
    email: varchar("email").unique().notNull(),
    bio: varchar("bio", { length: 400 }),
    avatar_url: varchar("avatar_url"),
    banner_url: varchar("banner_url"),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
  },
  (users) => {
    return {
      usernameIndex: uniqueIndex("username_idx").on(users.username),
      emailIndex: uniqueIndex("email_idx").on(users.email),
    };
  },
);
