import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { access } from 'fs/promises';
const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
	let refreshToken = '';
	let accessToken = '';
	try {
		accessToken = req.cookies.access_token;

		const valid = jwt.verify(accessToken, config.privateKey) as {
			email: string;
		};
		if (!valid) {
			refreshToken = req.cookies.refresh_token as string;
			console.log(refreshToken);
			const isvalid = jwt.verify(refreshToken, config.privateKey) as {
				email: string;
			};
			if (isvalid) {
				console.log(accessToken);
				accessToken = jwt.sign({ email: isvalid.email }, config.privateKey);
				res.cookie('access_token', accessToken, {
					maxAge: 1000 * 60,
				});
				next();
			}
			return res.status(401).send('nooooooooooooooo');
		}
		next();
	} catch (e: any) {
		return res.status(400).send(e.message);
	}
};

export default verifyAuth;
