import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import { HTTP_CONFIG } from './config/http.settings.js';

import { Router } from './routes/router.js';
import prisma from './services/prisma.instance.js';

const app = express();

app.use(cors({ origin: HTTP_CONFIG.SERVER.origins, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {res.redirect('/api');});

let baseRoute = Router('');
app.use('/api', (req, res, next) => {
  baseRoute = Router(req.path.split('/')[1]);
  next();
}, baseRoute);

app.locals.db = prisma;

export { app };
