// types/nitro.d.ts
import type { DrizzleDb } from 'drizzle-orm';
import type { PgTable } from 'drizzle-orm/pg-core';
import { usersTable } from '~/server/plugins/db'; // Import your users table

declare module 'nitropack' {
  interface NitroApp {
    db: DrizzleDb;
    usersTable: typeof usersTable; // Declare your usersTable schema
  }
}
