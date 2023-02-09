import request from 'supertest';
import app from '../../app';

describe('New Ticket', () => {
  it('has a route handler listening to /api/tickets for post requests', async () => {});
  it('can only be accessed if usee is signed in', async () => {});
  it('returns an error if an invalid title is provided', async () => {});
  it('returns an error if an invalid price is provided', async () => {});
  it('creates a ticket with valid payload', async () => {});
});
