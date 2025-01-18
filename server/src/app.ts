import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import './middlewares/db';
import { morganStream } from './middlewares/logger';

dotenv.config();

import userAPI from './api/v1/user/user.controller';
import middlewares from './middlewares';

const app = express();

app.use(morgan('combined', morganStream));
app.use(helmet());
app.use(cors());
app.use(express.json());

/**
 * Validate user session
 */
app.use(middlewares.jwtValidate());

/**
 * Throttling IPs based on Time Intervel
 */
app.use(middlewares.ipLimiter);

app.use('/api/v1/user', userAPI);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
