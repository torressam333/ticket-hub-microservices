import app from './app';
import mongoose from 'mongoose';
import { natsWrapper } from './NatsWrapper';
import { TicketCreatedSubscriber } from './events/subscribers/TicketCreatedSubscriber';
import { TicketUpdatedSubscriber } from './events/subscribers/TicketUpdatedSubscriber';
import { ExpirationCompleteSubscriber } from './events/subscribers/ExpirationCompleteSubscriber';

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

  // Pull from Orders depl file in k8s
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

    // Instantiate Ticket subscribers and listen for traffic
    new TicketCreatedSubscriber(natsWrapper.client).listen();
    new TicketUpdatedSubscriber(natsWrapper.client).listen();
    new ExpirationCompleteSubscriber(natsWrapper.client).listen();

    // Added per warning about false being default in mongo v7
    mongoose.set('strictQuery', true);

    // Orders mongo-srv cluster ip service ip address needed (kubectl get services)
    await mongoose.connect(process.env.MONGO_URI);

    console.log('Orders mongo srv connected properly...');
  } catch (error) {
    console.log('Something went wrong: ', error);
  }

  // K8S listening on port 3000 (@see auth-depl.yaml file)
  app.listen(3000, async () =>
    console.log('Orders service listening on port 3000')
  );
};

// Start app + other dependent start up code
start();
