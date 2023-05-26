import {
	mysqlTable,
	varchar,
	serial,
	uniqueIndex,
} from 'drizzle-orm/mysql-core';
export const users = mysqlTable(
	'users',
	{
		id: serial('id').primaryKey(),
		email: varchar('email', {
			length: 128,
		}).notNull(),
		password: varchar('password', {
			length: 256,
		}).notNull(),
	},
	(users) => ({
		emailIdx: uniqueIndex('email_idx').on(users.email),
	})
);
