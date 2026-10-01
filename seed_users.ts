import { config } from "dotenv";
config({ path: ".env.local" });
config();
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as t from "./src/db/schema";
import { hashPassword } from "./src/server/password";

const demoPassword = "ScholarSyncDemo!2026";

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool, { schema: t });
  try {
    const passwordHash = hashPassword(demoPassword);
    
    // Insert system
    await db.insert(t.users).values([
      {
        id: "demo-student",
        name: "Kavita Meena",
        email: "student@scholarsync.demo",
        passwordHash,
        role: "student",
        demo: true,
      },
      {
        id: "demo-officer",
        name: "Ananya Sharma",
        email: "officer@scholarsync.demo",
        passwordHash,
        role: "officer",
        demo: true,
      },
      {
        id: "demo-scheme",
        name: "Vikram Rao",
        email: "schemeadmin@scholarsync.demo",
        passwordHash,
        role: "scheme_admin",
        demo: true,
      },
      {
        id: "demo-admin",
        name: "Priya Menon",
        email: "admin@scholarsync.demo",
        passwordHash,
        role: "ministry_admin",
        demo: true,
      },
    ]).onConflictDoNothing();

    console.log("Users created successfully!");

  } catch (e) {
    console.error(e);
  } finally {
    await pool.end();
  }
}
main();
