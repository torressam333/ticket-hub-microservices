import request from 'supertest';
import app from '../../app';
import mongoose from 'mongoose';

describe('Updating tickets', () => {
  it('returns a 404 if a ticket id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
      .put(`/api/tickets/${id}`)
      .set('Cookie', signup())
      .send({
        title: 'Title',
        price: 20,
      })
      .expect(404);
  });

  it('returns a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
      .put(`/api/tickets/${id}`)
      .send({
        title: 'Some Title',
        price: 45,
      })
      .expect(401);
  });

  it('returns a 401 if a user does not own the ticket', async () => {
    const createTicketResponse = await request(app)
      .post('/api/tickets')
      .set('Cookie', signup())
      .send({ title: 'Testing', price: 20 });

    const ticketId = createTicketResponse.body.id;

    await request(app)
      .put(`/api/tickets/${ticketId}`)
      .set('Cookie', signup())
      .send({
        title: 'Some Title',
        price: 20,
      })
      .expect(401);
  });

  it('returns a 400 if the payload has incorrect values', async () => {
    const cookie = signup();

    const response = await request(app)
      .post('/api/tickets')
      .set('Cookie', cookie)
      .send({ title: 'Concert', price: 250 });

    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set('Cookie', cookie)
      .send({
        title: '',
        price: 250,
      })
      .expect(400);

    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set('Cookie', cookie)
      .send({
        title: 'Good title',
        price: -40,
      })
      .expect(400);
  });

  it('correctly updates the ticket', async () => {
    const cookie = signup();

    // Create ticket to be updated
    const response = await request(app)
      .post('/api/tickets')
      .set('Cookie', cookie)
      .send({ title: 'Concert', price: 250 });

    // Edit the same ticket created above
    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set('Cookie', cookie)
      .send({
        title: 'Blink 182 Concert',
        price: 400,
      })
      .expect(200);

    // Re-fetch ticket to ensure updates took place
    const ticketRes = await request(app)
      .get(`/api/tickets/${response.body.id}`)
      .send();

    expect(ticketRes.body.title).toEqual('Blink 182 Concert');
    expect(ticketRes.body.price).toEqual(400);
  });
});
