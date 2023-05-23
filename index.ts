import express from 'express';
import router from './src/routes/userRoute';
import cookieParser from 'cookie-parser';
const app = express();

const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());
app.use('/api', router);

app.get('/', async (req, res) => {
	res.send('test');
});

app.listen(port, () => {
	console.log('Express application running on port', port);
});
