import { randomUUID } from "node:crypto";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { groceryItems } from "../src/lib/server/db/schema";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL is required. Example: DATABASE_URL=... bun run seed:grocery"
  );
}

type SeedItem = Pick<
  typeof groceryItems.$inferInsert,
  "name" | "category" | "quantity" | "priority" | "purchased"
>;

const seedItems: SeedItem[] = [
  { name: "Bananas", category: "Produce", quantity: 6, priority: "medium", purchased: false },
  { name: "Avocado", category: "Produce", quantity: 3, priority: "high", purchased: false },
  { name: "Greek Yogurt", category: "Dairy", quantity: 2, priority: "medium", purchased: true },
  { name: "Cheddar Cheese", category: "Dairy", quantity: 1, priority: "low", purchased: false },
  { name: "Sourdough Bread", category: "Bakery", quantity: 1, priority: "high", purchased: false },
  { name: "Pasta", category: "Pantry", quantity: 2, priority: "low", purchased: false },
  { name: "Tomato Sauce", category: "Pantry", quantity: 2, priority: "medium", purchased: true },
  { name: "Granola Bars", category: "Snacks", quantity: 5, priority: "medium", purchased: false },
  { name: "Dark Chocolate", category: "Snacks", quantity: 2, priority: "low", purchased: false },
  { name: "Eggs", category: "Dairy", quantity: 12, priority: "high", purchased: false },
];

const pool = new Pool({ connectionString: databaseUrl });
const db = drizzle({ client: pool });

async function seed() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS grocery_items (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 1,
      purchased BOOLEAN NOT NULL DEFAULT FALSE,
      priority TEXT NOT NULL DEFAULT 'medium',
      updated_at BIGINT NOT NULL
    )
  `);

  await db.insert(groceryItems).values(
    seedItems.map((item) => ({
      ...item,
      id: randomUUID(),
      updated_at: Date.now(),
    }))
  );

  console.log(`Seed complete: inserted ${seedItems.length} grocery items.`);
}

seed()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(() => pool.end());
