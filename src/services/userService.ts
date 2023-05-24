import prisma from '../prisma';
import { UserInput } from '../schema/userSchema';
import { omit } from 'lodash';
import jwt from 'jsonwebtoken';
import { config } from '../config';
export async function createUser(input: UserInput) {
	try {
		const user = await prisma.user.create({
			data: {
				email: input.email,
				password: input.password,
			},
		});
		if (!user) throw new Error('user already exists');

		const accessToken = jwt.sign({ email: user.email }, config.privateKey, {
			expiresIn: '1m',
		});
		const refreshToken = jwt.sign({ email: user.email }, config.privateKey, {
			expiresIn: '30d',
		});

		return { ...omit(user, 'password'), accessToken, refreshToken };
	} catch (error: any) {
		throw new Error(error);
	}
}
