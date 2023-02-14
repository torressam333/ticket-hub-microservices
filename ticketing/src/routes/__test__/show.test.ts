import request from 'supertest';
import app from '../../app';

describe('show tickets', () => {
  it('returns a 404 if the ticket is not found', async () => {
    await request(app).get('/api/tickets/nonsense-id').send().expect(404);
  });

  it('returns the ticket if the ticket is found', async () => {
    // Make initial req to build ticket
    const cookie = signup();
    const title = 'Concert';
    const price = 100;

    const { body } = await request(app)
      .post('/api/tickets')
      .set('Cookie', cookie)
      .send({
        title,
        price,
      })
      .expect(201);

    // Fetch recently built ticket
    const ticket = await request(app)
      .get(`/api/tickets/${body.id}`)
      .send()
      .expect(200);

    expect(ticket.body.title).toEqual(title);
    expect(ticket.body.price).toEqual(price);
  });
});
