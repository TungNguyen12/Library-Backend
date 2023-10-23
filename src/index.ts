import express, {
  type Request,
  type Response,
} from 'express';

import { errorLoggingMiddleware } from './middlewares/error';
import { loggingMiddleware } from './middlewares/logging';
import itemsRoute from './routes/itemsRoute';

const PORT = 8080;
const app = express();

app.get('/hello', loggingMiddleware, (req: Request, res: Response) => {
    res.json({ msg: 'hello, from Express.js!' });
});

app.use('/items', itemsRoute);

app.use(errorLoggingMiddleware);

app.listen(PORT, () => {
    console.log(`👀 app is running at localhost:${PORT}`);
});
