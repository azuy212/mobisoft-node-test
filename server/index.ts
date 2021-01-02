import express from 'express';
import { SERVER_PORT } from './config';
import routes from './routes';

const app = express();
app.use(express.json());
app.use(routes);

app.listen(SERVER_PORT, () => console.log(`Server listening on ${SERVER_PORT}`));
