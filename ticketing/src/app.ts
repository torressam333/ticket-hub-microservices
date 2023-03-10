import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';

// MW Imports/Error class imports
import { errorHandler, NotFoundError, currentUser } from '@torressam/common';
import newTicketRouter from './routes/new';
import showTicketRouter from './routes/show';
import indexTicketRouter from './routes/index';
import updateRouter from './routes/update';

// Create express server
const app = express();

// Parse json from req bodies
app.use(express.json());

// Trust traffic being proxied to app via ingress-nginx
app.set('trust proxy', true);

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test', // Tests don't run in https
  })
);

// Middleware
app.use(currentUser);

// Use Routers
app.use(indexTicketRouter);
app.use(newTicketRouter);
app.use(showTicketRouter);
app.use(updateRouter);

// Fallback route handling - route not found at this point
app.all('*', async () => {
  throw new NotFoundError();
});

// Middlewares (error handler must come after route handlers)
app.use(errorHandler);

export default app;
