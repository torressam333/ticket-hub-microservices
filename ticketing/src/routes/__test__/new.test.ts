import request from 'supertest';
import app from '../../app';

describe('New Ticket', () => {
  it('has a route handler listening to /api/tickets for post requests', async () => {
    const response = await request(app).post('/api/tickets').send({});

    expect(response.status).not.toEqual(404);
  });

  it('can only be accessed if user is signed in', async () => {
    await request(app).post('/api/tickets').send({}).expect(401);
  });

  it('returns a status other than 401 if user is signed in', async () => {
    const cookie = signup();
    const response = await request(app)
      .post('/api/tickets')
      .set('Cookie', cookie); // adds auth header.send({});

    expect(response.status).not.toEqual(401);
  });

  it('returns an error if an invalid title is provided', async () => {
    const cookie = signup();
    await request(app)
      .post('/api/tickets')
      .set('Cookie', cookie)
      .send({
        title: '',
        price: 10,
      })
      .expect(400);

    await request(app)
      .post('/api/tickets')
      .set('Cookie', cookie)
      .send({
        price: 10,
      })
      .expect(400);
  });

  it('returns an error if an invalid price is provided', async () => {
    const cookie = signup();
    await request(app)
      .post('/api/tickets')
      .set('Cookie', cookie)
      .send({
        title: 'Concert',
        price: -45,
      })
      .expect(400);

    await request(app)
      .post('/api/tickets')
      .set('Cookie', cookie)
      .send({
        title: 'Concert2',
      })
      .expect(400);
  });

  it('creates a ticket with valid payload', async () => {
    // TODO: Add check to make sure a ticket was saved in mongo
    const cookie = signup();
    await request(app)
      .post('/api/tickets')
      .set('Cookie', cookie)
      .send({
        title: 'Concert',
        price: 67,
      })
      .expect(201);
  });
});
