// Implement mock nats wrapper so real NATS doesn't need to be running
export const natsWrapper = {
  client: {
    publish(subject: string, data: string, callback: () => void) {
      callback();
    },
  },
};
