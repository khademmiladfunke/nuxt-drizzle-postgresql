// migrations/create_users_table.ts
import { sql } from 'drizzle-orm';

export const up = sql`
  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    family VARCHAR(255) NOT NULL
  );
`;

export const down = sql`
  DROP TABLE IF EXISTS users;
`;
