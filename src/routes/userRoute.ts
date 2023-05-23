import { Router, Request, Response } from 'express';
import validate from '../validate';
import { z, TypeOf } from 'zod';
import prisma from '../prisma';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import verifyAuth from '../middleware/verifyAuth';
const router = Router();

const userInputSchema = z.object({
	email: z.string(),
	password: z.string(),
});
type UserInput = TypeOf<typeof userInputSchema>;

router.get('/me', verifyAuth, (req: Request, res: Response) => {
	return res.json('nooooooooooooooooooooo');
});

router.post(
	'/signup',
	validate(userInputSchema),
	async (req: Request<{}, {}, UserInput>, res: Response) => {
		try {
			const user = await prisma.user.create({
				data: {
					email: req.body.email,
					password: req.body.password,
				},
			});
			if (!user) {
				return res.json('Uh oh. Something went wrong');
			}

			const accessToken = jwt.sign({ email: user.email }, config.privateKey, {
				expiresIn: '1m',
			});
			const refreshToken = jwt.sign({ email: user.email }, config.privateKey, {
				expiresIn: '30d',
			});
			res.cookie('refresh_token', refreshToken, {
				// httpOnly: true,
				maxAge: 30 * 24 * 60 * 60 * 1000,
			});
			res.cookie('access_token', accessToken, {
				// httpOnly: true,
				maxAge: 1000 * 60,
			});
			return res.json({
				accessToken,
				refreshToken,
				email: user.email,
				id: user.id,
			});
		} catch (error: any) {
			console.log(error);
			return res.status(409).send(error.message);
		}
	}
);

export default router;
