// server/plugins/db.ts
import postgres from 'postgres'; // Import PostgresJS
import { drizzle } from 'drizzle-orm/postgres-js'; // Import Drizzle ORM for PostgresJS
import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

// Define the 'users' table schema
export const usersTable = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  family: varchar('family', { length: 255 }).notNull(),
});

// Define Nitro plugin for database connection
export default defineNitroPlugin(async (nitroApp) => {
  // Set up PostgreSQL client using PostgresJS
  const client = postgres(process.env.DATABASE_URL!, {
    // Add any necessary options if needed
  });

  // Set up Drizzle ORM with PostgreSQL client
  const db = drizzle(client);

  // Assign db and usersTable to NitroApp
  nitroApp.db = db;
  nitroApp.usersTable = usersTable;
});
