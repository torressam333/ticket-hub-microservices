import express from 'express';
import 'express-async-errors';

// Route imports
import currentUserRouter from './routes/currentUser';
import signinRouter from './routes/signin';
import signoutRouter from './routes/signout';
import signupRouter from './routes/signup';

// MW Imports
import { errorHandler } from './middlewares/error-handler';

// Error class imports
import { NotFoundError } from './errors/NotFoundError';

const app = express();
// Parse json from req bodies
app.use(express.json());

// Use imported route handlers
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// Fallback route handling - route not found at this point
app.all('*', () => {
  throw new NotFoundError();
});

// Middlewares (must come after route handlers)
app.use(errorHandler);

// Will eventually be replaced by kubernates
app.listen(3000, () => console.log('Auth service listening on port 3000'));
