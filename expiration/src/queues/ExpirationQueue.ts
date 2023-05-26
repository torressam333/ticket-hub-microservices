import Queue from 'bull';

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
  console.log(
    'TODO: Publish expiration:complete event for orderId',
    job.data.orderId
  );
});
