import express, { NextFunction, Request, Response } from 'express';
import router from './src/routes/userRoute';
import cookieParser from 'cookie-parser';
const app = express();
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());
app.use('/api', router);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});
app.get('/', async (req, res) => {
	res.send('test');
});

app.listen(port, () => {
	console.log('Express application running on port', port);
});
