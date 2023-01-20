import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';

// Route imports
import currentUserRouter from './routes/currentUser';
import signinRouter from './routes/signin';
import signoutRouter from './routes/signout';
import signupRouter from './routes/signup';

// MW Imports
import { errorHandler } from './middlewares/error-handler';

// Error class imports
import { NotFoundError } from './errors/NotFoundError';

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

// Use imported route handlers
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// Fallback route handling - route not found at this point
app.all('*', async () => {
  throw new NotFoundError();
});

// Middlewares (error handler must come after route handlers)
app.use(errorHandler);

export default app;
