import { natsWrapper } from '../../../NatsWrapper';
import { TicketUpdatedSubscriber } from '../TicketUpdatedSubscriber';
import { TicketUpdatedEvent } from '@torressam/common';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import Ticket from '../../../models/ticket';

const setup = async () => {
  // 1. Create instance of subscriber
  const subscriber = new TicketUpdatedSubscriber(natsWrapper.client);

  // 2. Create and save ticket
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'Opera',
    price: 300,
  });

  await ticket.save();

  // Fake data object
  const data: TicketUpdatedEvent['data'] = {
    id: ticket.id,
    version: ticket.version + 1,
    title: 'Italian Opera', // Updating this on same ticket
    price: 150, // Updating this on same ticket
    userId: new mongoose.Types.ObjectId().toHexString(),
  };

  // @ts-ignore - create fake msg
  const msg: Message = {
    ack: jest.fn(),
  };

  return { subscriber, data, msg, ticket };
};

describe('TicketUpdatedSubscriber', () => {
  it('finds, updates and saves a ticket', async () => {
    // 1. Call setup function
    const { subscriber, data, msg, ticket } = await setup();

    // 2. Call the onMessage fn with data and message objects
    await subscriber.onMessage(data, msg);

    const updatedTicket = await Ticket.findById(ticket.id);

    expect(updatedTicket!.title).toEqual(data.title);
    expect(updatedTicket!.price).toEqual(data.price);
    expect(updatedTicket!.version).toEqual(data.version);
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
