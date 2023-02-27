/**
 * Dedicated to be the publisher of this pub sub
 */
import nats from 'node-nats-streaming';

// Create "client" to connect to streaming server
const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
});

// Wait for client to successfully connect to n.s.s via "connect" emitted event
stan.on('connect', () => {
  console.log('pub is connected to nats');

  const data = {
    id: '123',
    title: 'Concert',
    price: 20,
  };

  const stringified = JSON.stringify(data);

  stan.publish('ticket:created', stringified, () => {
    console.log('Ticket created event published');
  });
});
