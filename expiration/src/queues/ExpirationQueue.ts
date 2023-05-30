import Queue from 'bull';
import { ExpirationCompletePublisher } from '../events/publishers/ExpirationCompletePublisher';
import { natsWrapper } from '../NatsWrapper';

interface Payload {
  orderId: string;
}

const expirationQueue = new Queue<Payload>('order:expiration', {
  redis: {
    host: process.env.REDIS_HOST,
  },
});

// Process is a method from bulls queue class
expirationQueue.process(async (job) => {
  // Emit/publish the expiration complete event for specific order by it's id
  new ExpirationCompletePublisher(natsWrapper.client).publish({
    orderId: job.data.orderId,
  });
});

export default expirationQueue;
