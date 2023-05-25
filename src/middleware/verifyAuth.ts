import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import ApplicationError from '../error';
import { z } from 'zod';

const decodedSchema = z.object({
	email: z.string().email(),
});

const verifyAuth = async (req: Request, res: Response, next: NextFunction) => {
	try {
		if (!req.headers.authorization) {
			throw new ApplicationError('Bearer token not sent in header', 401);
		}
		const accessToken = req.headers.authorization.split(' ')[1];
		const decoded = jwt.verify(accessToken, config.privateKey);

		const parsed = decodedSchema.safeParse(decoded);
		console.log(parsed);
		if (!parsed.success) {
			throw new ApplicationError('JWT Malformed. Login again,401');
		}
		res.locals.user = decoded;
		next();
	} catch (error) {
		next(error);
	}
};

export default verifyAuth;
