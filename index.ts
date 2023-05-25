import express, { NextFunction, Request, Response } from 'express';
import userRoute from './src/routes/userRoute';
import cookieParser from 'cookie-parser';
const app = express();
import dotenv from 'dotenv';
import ApplicationError from './src/error';
import { TokenExpiredError } from 'jsonwebtoken';
import { ZodError } from 'zod';
dotenv.config();

const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api', userRoute);

// Error Handler
app.use(
	(
		err: ApplicationError | Error,
		_req: Request,
		res: Response,
		_next: NextFunction
	) => {
		console.error(err.stack);
		if (err instanceof ApplicationError) {
			const status = err.status || 500;
			console.error(status);
			return res.status(status).send({
				error: {
					message: err.message,
				},
			});
		}
		if (err instanceof TokenExpiredError) {
			return res.status(401).send({
				error: {
					message: 'Token Expired. Log in again',
				},
			});
		}

		// Handling zod schema validation errors

		if (err instanceof ZodError) {
			return res.status(400).send({
				error: {
					message: err.errors[0].message,
				},
			});
		}
		return res.status(400).send({
			error: {
				message: err.message,
			},
		});
	}
);

async function main() {
	try {
		app.listen(port, () => {
			console.log('Express application running on port', port);
		});
	} catch (error) {
		console.error(error);
	}
}

main();
