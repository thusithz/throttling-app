import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';


dotenv.config();

import userAPI from './api/v1/user/user.controller';
import middlewares from './middlewares';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

/**
 * Validate user session
 */
app.use(middlewares.jwtValidate());

app.get('/', (req, res) => {
  res.json({
    message: 'End points are starting from /api',
  }); 
});

app.use('/api/v1/user', userAPI);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;