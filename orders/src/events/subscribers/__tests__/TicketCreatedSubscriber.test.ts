const setup = async () => {
  // 1. Create instance of subscriber
  // 2. Create fake instance of data event object
  // 3. Create fake message object
  // 4. Call the onMessage fn with data and message objects
};

describe('TicketCreatedSubscriber', () => {
  it('creates and saves a ticket', async () => {
    // 1. Call setup function
    // 2. Assert a ticket was created
  });

  it('acknowledges the message for event concurrency', async () => {
    // 1. Call setup function
    // 2. Assert to ensure ack function is called
  });
});
