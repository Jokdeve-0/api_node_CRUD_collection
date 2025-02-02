import 'dotenv/config';
import { AppServer } from './src/classes/Server.js';
import { app } from './src/app.js';

new AppServer(app);
