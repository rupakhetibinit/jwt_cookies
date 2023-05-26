import { MySql2Database, drizzle } from 'drizzle-orm/mysql2';

import mysql2, { Connection } from 'mysql2/promise';
import drizzleConfig from '../drizzle.config';
export let db: MySql2Database<Record<string, never>>;

export const createConnection = async () => {
	if (!db) {
		const connnection = await mysql2.createConnection({
			host: drizzleConfig.host,
			user: drizzleConfig.user,
			database: drizzleConfig.database,
		});
		db = drizzle(connnection);
	}
	return db;
};
