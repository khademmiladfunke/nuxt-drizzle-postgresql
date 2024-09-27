import type { Config } from 'drizzle-kit';

export default {
  schema: './src/schema.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'milad', // Your actual password
    database: 'mydb',
    ssl: false, // Disable SSL
  },
} satisfies Config;
