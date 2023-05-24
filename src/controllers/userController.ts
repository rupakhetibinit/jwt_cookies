import { Response, Request, NextFunction } from 'express';
import { UserInput } from '../schema/userSchema';
import { createUser, loginUser } from '../services/userService';

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
