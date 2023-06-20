import React from 'react';

const TicketShow = ({ ticket }) => {
  return <div>TicketShow</div>;
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
