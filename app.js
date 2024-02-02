import express from 'express';
import RouterUsers from './app/routers/RouterUser.js';
import tokenRoute from './app/routers/token.js';
import protect from './app/protected.js'

const app = express();
app.use(express.json());
app.use(RouterUsers);
app.use(tokenRoute)
app.use(protect)


export default app;