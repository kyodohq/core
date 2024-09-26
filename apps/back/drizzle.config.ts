import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/models/*",
  dialect: "postgresql",
  verbose: true,
  strict: true,
  dbCredentials: {
    url: process.env.DB_URL!,
  },
});
