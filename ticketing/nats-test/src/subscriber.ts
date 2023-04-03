/**
 * Dedicated to be a listener for events of pub-sub
 */
import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { TicketCreatedSubscriber } from './events/TicketCreatedSubscriber';

// Remove metadata from cli output
console.clear();

// Create "client" to connect to streaming server
const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('subscriber connected to nats');

  // Handles all connection and event handling for nats
  new TicketCreatedSubscriber(stan).listen();
});
