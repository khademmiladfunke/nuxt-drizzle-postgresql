// server/api/users/[id].put.ts
import { defineEventHandler, readBody, getRouterParams } from 'h3';
import { eq } from 'drizzle-orm'; // Import 'eq' for comparison

export default defineEventHandler(async (event) => {
  const { db, usersTable } = useNitroApp(); // Get db and usersTable from NitroApp
  const { id } = getRouterParams(event); // Extract the user ID from the URL
  const body = await readBody(event); // Get the body with updated data
  const { name, family } = body; // Extract the fields to update

  // Update user data in the users table
  const result = await db
    .update(usersTable)
    .set({ name, family })
    .where(eq(usersTable.id, Number(id))); // Use eq() from drizzle-orm for comparison

  if (result.rowCount === 0) {
    return { success: false, message: `User with id ${id} not found` };
  }

  return { success: true, message: `User with id ${id} updated successfully` };
});
