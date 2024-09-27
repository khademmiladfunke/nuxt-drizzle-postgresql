// server/api/users/index.get.ts
import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
  const { db, usersTable } = useNitroApp(); // Get db and usersTable from NitroApp

  // Fetch all users
  const users = await db.select().from(usersTable);

  // Return the users list as the response
  return { success: true, data: users };
});
