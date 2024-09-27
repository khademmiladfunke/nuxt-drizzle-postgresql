// server/api/users/[id].delete.ts
import { defineEventHandler, getRouterParams } from 'h3';
import { eq } from 'drizzle-orm'; // Import 'eq' for comparison

export default defineEventHandler(async (event) => {
  const { db, usersTable } = useNitroApp(); // Get db and usersTable from NitroApp
  const { id } = getRouterParams(event); // Extract the user ID from the URL

  // Delete the user from the users table
  const result = await db
    .delete(usersTable)
    .where(eq(usersTable.id, Number(id))); // Use eq() from drizzle-orm for comparison

  if (result.rowCount === 0) {
    return { success: false, message: `User with id ${id} not found` };
  }

  return { success: true, message: `User with id ${id} deleted successfully` };
});
