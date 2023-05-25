import { natsWrapper } from './NatsWrapper';

// Mongoose connect fn
const start = async () => {
  // Check for required env vars
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

    console.log('Ticketing mongo srv connected properly...');
  } catch (error) {
    console.log('Something went wrong: ', error);
  }
};

// Start app + other dependent start up code
start();
