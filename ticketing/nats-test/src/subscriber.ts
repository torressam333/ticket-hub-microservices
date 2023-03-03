/**
 * Dedicated to be a listener for events of pub-sub
 */
import nats, { Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

// Remove metadata from cli output
console.clear();

// Create "client" to connect to streaming server
const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('subscriber connected to nats');

  // Do manual ack check that even successfully processed
  const options = stan.subscriptionOptions().setManualAckMode(true);

  // Subscribe to specific emitted event + queue group to prevent
  // duplicate subscription events
  const subscription = stan.subscribe(
    'ticket:created',
    'orders-service-queue-group',
    options
  );

  subscription.on('message', (msg: Message) => {
    const data = msg.getData();

    if (typeof data === 'string') {
      console.log(`Received event #${msg.getSequence()}, with data ${data}`);
    }

    // Must manually ack event for nats to finish processing any retries
    msg.ack();
  });
});
