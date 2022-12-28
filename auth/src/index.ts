import express from 'express';
import currentUserRouter from './routes/currentUser';
import signinRouter from './routes/signin';
import { signOutRouter } from './routes/signOut';
import signupRouter from './routes/signup';
import { errorHandler } from './middlewares/error-handler';

const app = express();
// Parse json from req bodies
app.use(express.json());

// Middlewares
app.use(errorHandler);

// Use imported route handlers
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signOutRouter);
app.use(signupRouter);

// Will eventually be replaced by kubernates
app.listen(3000, () => console.log('Auth service listening on port 3000'));
