import { Router, Request, Response } from 'express';
import validate from '../middleware/validate';
import verifyAuth from '../middleware/verifyAuth';
const userRoute = Router();
import {
	createUserHandler,
	newAcessTokenHandler,
	signInHandler,
} from '../controllers/userController';
import {
	newAccessTokenInputSchema,
	userInputSchema,
} from '../schema/userSchema';

userRoute.get('/me', verifyAuth, (req: Request, res: Response) => {
	return res.json({
		user: res.locals.user,
	});
});

userRoute.post('/signup', validate(userInputSchema), createUserHandler);

userRoute.post('/signin', validate(userInputSchema), signInHandler);

userRoute.post(
	'/refresh',
	validate(newAccessTokenInputSchema),
	newAcessTokenHandler
);

export default userRoute;
