import { readBody } from 'h3'; // Import readBody to read the request body

export default defineEventHandler(async (event) => {
  const { db, usersTable } = useNitroApp(); // Use it directly without import
  const body = await readBody(event); // Read the request body
  const { name, family } = body; // Destructure name and family from the body

  // Insert a new user into the users table
  await db.insert(usersTable).values({ name, family });

  return { success: true, message: 'User created successfully' }; // Return success message
});
