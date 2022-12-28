import express from 'express';
import currentUserRouter from './routes/currentUser';
import signinRouter from './routes/signin';
import { signOutRouter } from './routes/signOut';
import signupRouter from './routes/signup';
import { errorHandler } from './middlewares/error-handler';

const app = express();
// Parse json from req bodies
app.use(express.json());

// Use imported route handlers
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signOutRouter);
app.use(signupRouter);

// Middlewares (must come after route handlers)
app.use(errorHandler);

// Will eventually be replaced by kubernates
app.listen(3000, () => console.log('Auth service listening on port 3000'));
