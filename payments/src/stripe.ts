import Stripe from 'stripe';

// Singleton for using strip elsewhere in payments srv
export const stripe = new Stripe(process.env.STRIPE_KEY!, {
  apiVersion: '2022-11-15',
});
