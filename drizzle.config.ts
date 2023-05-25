import type { Config } from 'drizzle-kit';

const config = {
	schema: './db/schema.ts',
	host: 'localhost',
	database: 'drizzle-test',
	user: 'root',
	out: './migrations',
} satisfies Config;

export default config;
