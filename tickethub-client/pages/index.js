import React from 'react';

const LandingPage = ({ currentUser, tickets }) => {
  const ticketList = tickets.map((ticket) => {
    return (
      <tr key={ticket.id}>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
      </tr>
    );
  });

  return (
    <div>
      <h1>Tickets</h1>
      <table className='table'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{ticketList}</tbody>
      </table>
    </div>
  );
};

// Fetch data during SSR process
LandingPage.getInitialProps = async (context, client, currentUser) => {
  // Request to ticket service to get all tickets
  const { data } = await client.get('/api/tickets');

  // Gets merged into props being passed to LandingPage component above
  return { tickets: data };
};

export default LandingPage;
