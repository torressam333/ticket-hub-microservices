import { natsWrapper } from '../../NatsWrapper';
import { Message } from 'node-nats-streaming';
import { Subjects, Subscriber, TicketCreatedEvent } from '@torressam/common';
import Ticket from '../../models/ticket';
