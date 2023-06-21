import React from 'react';
import { useRequest } from '../../hooks/useRequest';

const TicketShow = ({ ticket }) => {
  const { executeRequest, errors } = useRequest({
    url: '/api/orders',
    method: 'post',
    body: { ticketId: ticket.id },
    onSuccess: (order) => console.log(order),
  });

  return (
    <div>
      <h1>{ticket.title}</h1>
      <h4>{ticket.price}</h4>
      {errors}
      <button className='btn btn-primary' onClick={executeRequest}>
        Purchase
      </button>
    </div>
  );
};

// Grab props needed to display in component
TicketShow.getInitialProps = async (context, client) => {
  // Grab ticket id from url (matches filename for query parm [ticketId])
  const { ticketId } = context.query;
  const { data } = await client.get(`/api/tickets/${ticketId}`);

  // merge into all diff props from the TicketShow comp above
  return { ticket: data };
};

export default TicketShow;
