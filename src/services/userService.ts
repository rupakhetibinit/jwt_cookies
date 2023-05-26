import { UserInput } from '../schema/userSchema';
import { omit } from 'lodash';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import * as argon2 from 'argon2';
import ApplicationError from '../error';
import { db } from '../db';
import { users } from '../../db/schema';
import { eq, lt, gte, ne, InferModel } from 'drizzle-orm';

export async function createUser(input: UserInput) {
	const [existingUser] = await db
		.select()
		.from(users)
		.where(eq(users.email, input.email));

	if (existingUser) {
		throw new ApplicationError('User already exists', 409);
	}
	const hashedPassword = await argon2.hash(input.password);

	const [] = await db.insert(users).values({
		email: input.email,
		password: hashedPassword,
	});

	const [newUser] = await db
		.select()
		.from(users)
		.where(eq(users.email, input.email));

	if (!newUser) {
		throw new ApplicationError(
			"Couldn't create user. Please try again later",
			400
		);
	}

	const accessToken = jwt.sign({ email: newUser.email }, config.privateKey, {
		expiresIn: '1m',
	});

	const refreshToken = jwt.sign({ email: newUser.email }, config.privateKey, {
		expiresIn: '30d',
	});

	return { ...omit(newUser, 'password'), accessToken, refreshToken };
}

export async function loginUser(input: UserInput) {
	const [user] = await db
		.select()
		.from(users)
		.where(eq(users.email, input.email));

	if (!user) throw new ApplicationError("User doesn't exist", 404);

	const verified = await argon2.verify(user.password, input.password);

	if (!verified) {
		throw new ApplicationError("Passwords don't match", 400);
	}

	const accessToken = jwt.sign({ email: input.email }, config.privateKey, {
		expiresIn: '1m',
	});

	const refreshToken = jwt.sign({ email: input.email }, config.privateKey, {
		expiresIn: '30d',
	});

	return { ...omit(user, 'password'), accessToken, refreshToken };
}
