/**
 * Dedicated to be a listener for events of pub-sub
 */
import nats, { Message, Stan } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

// Remove metadata from cli output
console.clear();

// Create "client" to connect to streaming server
const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('subscriber connected to nats');

  stan.on('close', () => {
    console.log('nats connection has been closed');
    process.exit();
  });

  // Do manual ack check that even successfully processed
  const options = stan
    .subscriptionOptions()
    .setManualAckMode(true)
    .setDeliverAllAvailable()
    .setDurableName('orders-service');

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

// Handle the stop/close/restarting of any downstream subscribers
// Watch for interrupt or terminate signal. Incercept these req's and close the connection in node nats server.
process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());

abstract class Subscriber {
  abstract subject: string;
  abstract queueGroupName: string;
  abstract onMessage(data: any, msg: Message): void;
  private client: Stan;
  protected ackWait = 5 * 1000;

  constructor(client: Stan) {
    this.client = client;
  }

  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait) // Only wait 5 seconds to retry events
      .setDurableName(this.queueGroupName);
  }

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );

    subscription.on('message', (msg: Message) => {
      // Quick indicator for message events
      console.log(`Message received: ${this.subject} / ${this.queueGroupName}`);

      // Parse data from event
      const parsedData = this.parseMessage(msg);

      this.onMessage(parsedData, msg);
    });
  }

  parseMessage(msg: Message) {
    const data = msg.getData();

    // Add ability to parse string or buffer
    return typeof data === 'string'
      ? JSON.parse(data)
      : JSON.parse(data.toString('utf8'));
  }
}
