/**
 * Dedicated to be the publisher of this pub sub
 */
import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/TicketCreatedPublisher';

// Remove metadata from cli output
console.clear();

// Create "client" to connect to streaming server
const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
});

// Wait for client to successfully connect to n.s.s via "connect" emitted event
stan.on('connect', async () => {
  console.log('pub is connected to nats');
  const publisher = new TicketCreatedPublisher(stan);

  try {
    await publisher.publish({
      id: 'FakeIdForNow12345',
      title: 'SOme event',
      price: 45,
      userId: '123Fake',
    });
  } catch (error) {
    console.error(error);
  }
});
