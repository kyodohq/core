import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const queryClient = postgres(process.env.DB_URL!, { max: 1 });
const db = drizzle(queryClient);

await migrate(db, { migrationsFolder: "./drizzle" });
await queryClient.end();
