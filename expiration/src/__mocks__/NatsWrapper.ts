// Implement mock nats wrapper so real NATS doesn't need to be running
export const natsWrapper = {
  client: {
    // Return new anonymous function as publish
    publish: jest
      .fn()
      .mockImplementation(
        (subject: string, data: string, callback: () => void) => {
          callback();
        }
      ),
  },
};
