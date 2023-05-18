import { natsWrapper } from '../../../NatsWrapper';
import { TicketCreatedSubscriber } from '../TicketCreatedSubscriber';
import { TicketCreatedEvent } from '@torressam/common';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import Ticket from '../../../models/ticket';

const setup = async () => {
  // 1. Create instance of subscriber
  const subscriber = new TicketCreatedSubscriber(natsWrapper.client);

  // 2. Create fake instance of data event object
  const data: TicketCreatedEvent['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    title: 'Concert',
    price: 100,
    userId: new mongoose.Types.ObjectId().toHexString(),
  };

  // 3. Create fake message object
  // @ts-ignore
  // ^^Use this^^: (dont want to have to implement EVERY method on nats streaming message class)
  const msg: Message = {
    ack: jest.fn(),
  };

  return { subscriber, data, msg };
};

describe('TicketCreatedSubscriber', () => {
  it('creates and saves a ticket', async () => {
    // 1. Call setup function
    const { subscriber, data, msg } = await setup();
    // 2. Call the onMessage fn with data and message objects
    await subscriber.onMessage(data, msg);

    // 3. Assert a ticket was created
    const ticket = await Ticket.findById(data.id);

    expect(ticket).toBeDefined();
    expect(ticket?.title).toEqual(data.title);
    expect(ticket?.price).toEqual(data.price);
  });

  it('acknowledges the message for event concurrency', async () => {
    // 1. Call setup function
    const { subscriber, data, msg } = await setup();

    // 2. Call onMessage function
    await subscriber.onMessage(data, msg);

    // 3. Assert to ensure ack function is called
    expect(msg.ack).toHaveBeenCalled();
  });
});
