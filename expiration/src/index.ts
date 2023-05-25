import app from './app';
import mongoose from 'mongoose';
import { natsWrapper } from './NatsWrapper';
import { OrderCreatedSubscriber } from './events/subscribers/OrderCreatedSubscriber';
import { OrderCancelledSubscriber } from './events/subscribers/OrderCancelledSubscriber';

// Mongoose connect fn
const start = async () => {
  // Check for required env vars
  if (!process.env.JWT_KEY) throw new Error('JWT_KEY is undefined');
  if (!process.env.MONGO_URI) throw new Error('Mongo uri is undefined');
  if (!process.env.NATS_CLUSTER_ID)
    throw new Error('NATS cluster id undefined');
  if (!process.env.NATS_CLIENT_ID)
    throw new Error('NATS client id is undefined');
  if (!process.env.NATS_URL) throw new Error('NATS url is undefined');

  // Pull from ticketing depl file in k8s
  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );

    natsWrapper.client.on('close', () => {
      console.log('NATS Connection Closed');

      process.exit();
    });

    // Handle the stop/close/restar ting of any downstream subscribers
    // Watch for interrupt or terminate signal. Incercept these req's and close the connection in node nats server
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    // Begin listening for order created/cancelled events
    new OrderCreatedSubscriber(natsWrapper.client).listen();
    new OrderCancelledSubscriber(natsWrapper.client).listen();

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
