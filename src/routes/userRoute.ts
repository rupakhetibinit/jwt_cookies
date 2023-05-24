import { Router, Request, Response } from 'express';
import validate from '../middleware/validate';
import verifyAuth from '../middleware/verifyAuth';
const router = Router();
import { createUserHandler } from '../controllers/userController';
import { userInputSchema } from '../schema/userSchema';

router.get('/me', verifyAuth, (req: Request, res: Response) => {
	return res.json('nooooooooooooooooooooo');
});

router.post('/signup', validate(userInputSchema), createUserHandler);

export default router;
