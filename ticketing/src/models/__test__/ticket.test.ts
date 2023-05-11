import Ticket from '../ticket';

describe('Ticket Model', () => {
  it('implements optimistic concurrency control by version number', async () => {
    // Create instance of ticket
    const ticket = Ticket.build({
      title: 'concert',
      price: 100,
      userId: '123',
    });

    // Save to db (will have version # assigned to ticket)
    await ticket.save();

    // Fetch same ticket twice
    const firstInstance = await Ticket.findById(ticket.id);
    const secondInstance = await Ticket.findById(ticket.id);

    // Make 2 separate changes to fetched tickets
    firstInstance!.set({ title: 'Snoop Dogg Concert' });
    secondInstance!.set({ title: 'Logic Concert' });

    // save first fetched ticket w/ change and updated version #
    await firstInstance!.save();

    // Save 2nd ticket (w. outdated version #) and expect error
    try {
      await secondInstance!.save();
    } catch (error) {
      return;
    }

    // Work around test to ensure it doesnt go past try catch. If we see
    // this thrown error, its a failing
    throw new Error('Should not reach this point');
  });

  it('increments the version number on multiple saves', async () => {
    // Create instance of ticket
    const ticket = Ticket.build({
      title: 'concert',
      price: 20,
      userId: 'abc',
    });

    await ticket.save();

    expect(ticket.version).toEqual(0);

    await ticket.save();

    expect(ticket.version).toEqual(1);

    await ticket.save();

    expect(ticket.version).toEqual(2);
  });
});
