import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

const validate =
	(schema: AnyZodObject) =>
	(req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse(req.body);
			next();
		} catch (e) {
			next(e);
		}
	};

export default validate;
