import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';

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
app.all('*', async () => {
  throw new NotFoundError();
});

// Middlewares (must come after route handlers)
app.use(errorHandler);

// Mongoose connect fn
const start = async () => {
  try {
    // Added per warning about false being default in mongo v7
    mongoose.set('strictQuery', true);

    // Auth mongo-srv cluster ip service ip address needed (kubectl get services)
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');

    console.log('Mongo auth srv connected properly...');
  } catch (error) {
    console.log('Something went wrong: ', error);
  }

  // K8S listening on port 3000 (@see auth-depm.yaml file)
  app.listen(3000, async () =>
    console.log('Auth service listening on port 3000')
  );
};

// Start app
start();
