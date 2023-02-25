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
});
