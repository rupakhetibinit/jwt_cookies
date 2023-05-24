import { Router, Request, Response } from 'express';
import validate from '../middleware/validate';
import verifyAuth from '../middleware/verifyAuth';
const userRoute = Router();
import { createUserHandler } from '../controllers/userController';
import { userInputSchema } from '../schema/userSchema';

userRoute.get('/me', verifyAuth, (req: Request, res: Response) => {
	return res.json('nooooooooooooooooooooo');
});

userRoute.post('/signup', validate(userInputSchema), createUserHandler);

export default userRoute;
