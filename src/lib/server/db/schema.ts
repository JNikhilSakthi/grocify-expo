import { bigint, boolean, integer, pgTable, text } from "drizzle-orm/pg-core";
import type { GroceryCategory, GroceryPriority } from "@/store/grocery-store";

export const groceryItems = pgTable("grocery_items", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").$type<GroceryCategory>().notNull(),
  quantity: integer("quantity").notNull().default(1),
  purchased: boolean("purchased").notNull().default(false),
  priority: text("priority").$type<GroceryPriority>().notNull().default("medium"),
  updated_at: bigint("updated_at", { mode: "number" }).notNull(),
});
