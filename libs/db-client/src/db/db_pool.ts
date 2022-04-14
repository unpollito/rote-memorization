import { Pool } from "pg";

let pool: Pool | undefined;

export const getDbPool = (): Pool => {
  if (!pool) {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL not set");
    }
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
  }
  return pool;
};
