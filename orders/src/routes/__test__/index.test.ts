import request from 'supertest';
import app from '../../app';
import Order, { OrderStatus } from '../../models/order';
import mongoose from 'mongoose';
import Ticket from '../../models/ticket';

describe('Orders Service', () => {
  it('fetches orders for a particular user', async () => {
    // create 3 tickets and persist (to be reserved by test users)
    
    // create one order as user #1

    // create 2 orders as user #2

    // make request to get orders for user #2

    // expect 2 orders for user #2 were fetched
  });
});
