import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import ApplicationError from '../error';

const verifyAuth = async (req: Request, res: Response, next: NextFunction) => {
	try {
		if (!req.headers.authorization) {
			throw new ApplicationError('Bearer token not sent in header', 401);
		}
		const accessToken = req.headers.authorization.split(' ')[1];
		const decoded = jwt.verify(accessToken, config.privateKey);
		if (decoded) {
			res.locals.user.email = decoded;
		}
		// if (!verified) throw new ApplicationError('Token invalid', 401);
		next();
	} catch (error) {
		next(error);
	}
};

export default verifyAuth;
