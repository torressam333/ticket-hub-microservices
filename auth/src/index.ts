import express from 'express';
import { currentUserRouter } from './routes/currentUser';
import { signInRouter } from './routes/signIn';
import { signOutRouter } from './routes/signOut';
import { signUpRouter } from './routes/signUp';

const app = express();
// Parse json from req bodies
app.use(express.json());

// Use imported route handlers
app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

// Will eventually be replaced by kubernates
app.listen(3000, () => console.log('Auth service listening on port 3000'));
