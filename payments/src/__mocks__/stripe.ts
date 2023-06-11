// Implement mock stripe api client so real stripe doesn't need to be running
export const stripe = {
  charges: {
    // Return promise that auto resolves as stripes charges.create method
    create: jest.fn().mockResolvedValue({}),
  },
};
