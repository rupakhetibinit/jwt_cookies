import { Response, Request, NextFunction } from 'express';
import { NewAccessTokenInput, UserInput } from '../schema/userSchema';
import { createUser, loginUser } from '../services/userService';
import { config } from '../config';
import ApplicationError from '../error';
import jwt from 'jsonwebtoken';

export async function createUserHandler(
	req: Request<{}, {}, UserInput>,
	res: Response,
	next: NextFunction
) {
	try {
		const user = await createUser(req.body);

		return res.send(user);
	} catch (error) {
		next(error);
	}
}

export async function signInHandler(
	req: Request<{}, {}, UserInput>,
	res: Response,
	next: NextFunction
) {
	try {
		const user = await loginUser(req.body);
		return res.send(user);
	} catch (error) {
		next(error);
	}
}

export async function newAcessTokenHandler(
	req: Request<{}, {}, NewAccessTokenInput>,
	res: Response,
	next: NextFunction
) {
	try {
		const refreshToken = req.body.refreshToken;
		let accessToken;
		const decoded = jwt.verify(refreshToken, config.privateKey) as {
			email: string;
		};
		if (decoded) {
			accessToken = jwt.sign({ email: decoded.email }, config.privateKey, {
				expiresIn: '1m',
			});

			return res.json({
				refreshToken,
				accessToken,
			});
		}
		throw new ApplicationError('Something went wrong', 400);
	} catch (error) {
		next(error);
	}
}
