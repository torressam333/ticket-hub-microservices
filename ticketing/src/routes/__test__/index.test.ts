import request from 'supertest';
import app from '../../app';

const createTicket = (title: string, price: number) => {
  const cookie = signup();

  return request(app).post('/api/tickets').set('Cookie', cookie).send({
    title,
    price,
  });
};

describe('show all tickets on index page', () => {
  it('can fetch a list of tickets', async () => {
    // 1. Create a couple of tickets
    await createTicket('Concert', 100);
    await createTicket('Football Game', 300);
    await createTicket('Something else', 45);

    const response = await request(app).get('/api/tickets').send().expect(200);

    expect(response.body.length).toEqual(3);
  });
});
