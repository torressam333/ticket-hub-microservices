/**
 * This file represents the DEFINITION
 * of what a NATS publisher is in the context
 * of this application.
 *
 * This abstract class should only be extended and
 * never instantiated directly.
 */
import { Stan } from 'node-nats-streaming';
import { Subjects } from './subjects';

interface Event {
  subject: Subjects;
  data: any;
}
export abstract class Publisher<T extends Event> {
  abstract subject: T['subject'];
  private client: Stan;

  // Add copy of nats client
  constructor(client: Stan) {
    this.client = client;
  }

  publish(data: T['data']): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.publish(this.subject, JSON.stringify(data), (err) => {
        if (err) return reject(err);

        console.log('event published to subject', this.subject);
        resolve();
      });
    });
  }
}
