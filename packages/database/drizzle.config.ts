import { defineConfig } from "drizzle-kit";
import { env } from "@repo/env";

const nonPoolingUrl = env.DATABASE_URL.replace(":6543", ":5432");

export default defineConfig({
  out: "./drizzle/migrations",
  schema: "./drizzle/schema/index.ts",
  schemaFilter: ["public"],
  dialect: "postgresql",
  dbCredentials: { url: nonPoolingUrl },
});
