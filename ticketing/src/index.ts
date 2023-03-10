import app from './app';
import mongoose from 'mongoose';

// Mongoose connect fn
const start = async () => {
  // Check for required env vars
  if (!process.env.JWT_KEY) throw new Error('JWT_KEY is undefined');
  if (!process.env.MONGO_URI) throw new Error('Mongo uri is undefined');

  try {
    // Added per warning about false being default in mongo v7
    mongoose.set('strictQuery', true);

    // Ticketing mongo-srv cluster ip service ip address needed (kubectl get services)
    await mongoose.connect(process.env.MONGO_URI);

    console.log('Ticketing mongo srv connected properly...');
  } catch (error) {
    console.log('Something went wrong: ', error);
  }

  // K8S listening on port 3000 (@see auth-depl.yaml file)
  app.listen(3000, async () =>
    console.log('Ticketing service listening on port 3000')
  );
};

// Start app + other dependent start up code
start();
