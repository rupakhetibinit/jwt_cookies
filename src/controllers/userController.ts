import { Response, Request } from 'express';
import { UserInput } from '../schema/userSchema';
import { createUser } from '../services/userService';

export async function createUserHandler(
	req: Request<{}, {}, UserInput>,
	res: Response
) {
	try {
		const user = await createUser(req.body);
		res.cookie('refresh_token', user.refreshToken, {
			// httpOnly: true,
			maxAge: 30 * 24 * 60 * 60 * 1000,
		});
		res.cookie('access_token', user.accessToken, {
			// httpOnly: true,
			maxAge: 1000 * 60,
		});

		return res.send(user);
	} catch (error: any) {
		return res.status(409).send(error.message);
	}
}
