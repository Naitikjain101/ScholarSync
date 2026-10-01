import { config } from "dotenv";
config({ path: ".env.local" });
config();
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./src/db/schema";
import { sql } from "drizzle-orm";

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool, { schema });
  try {
    const res = await db.execute(sql`SELECT count(*) FROM applications`);
    console.log("Applications count:", res.rows[0].count);
    const k = await db.execute(sql`SELECT count(*) FROM applications WHERE id = 'SS-2026-00124'`);
    console.log("Kavita Meena application count:", k.rows[0].count);
  } catch (e) {
    console.error(e);
  } finally {
    await pool.end();
  }
}
main();
