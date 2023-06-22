import React from 'react';
import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const STRIPE_PUBLIC_KEY =
    'pk_test_51NH6BIEE0PnH1tEj6Br5pvoEkccVPmhbidCkPl0CRcMK9Mf9la0KOsxkxOC5dndoh3s9W2xomjvnjOlB9G0O3c0e00r4qMahHj';

  useEffect(() => {
    const findTimeLeft = () => {
      // Return in ms
      const msLeft = new Date(order.expiresAt) - new Date();

      // use ms's to update timeleft state
      setTimeLeft(Math.round(msLeft / 1000));
    };

    // Invoke immediataetly to skip initial 1 sec delay
    findTimeLeft();

    const timerId = setInterval(findTimeLeft, 1000);

    // Invoke when navigating away from comp/re-rendering comp
    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  if (timeLeft < 1) return <div>Order Has Expired</div>;

  return (
    <div>
      <h1>Order</h1>
      <h2>You have {timeLeft} seconds to finish this purchase</h2>
      <h4>Title: {order.ticket.title}</h4>
      <h4>Price: ${order.ticket.price}</h4>
      <button className='btn btn-success'>Purchase</button>

      <StripeCheckout
        token={(token) => console.log(token)}
        stripeKey={STRIPE_PUBLIC_KEY}
        amount={order.ticket.price * 100} // Cents to dollars
        email={currentUser.email}
      />
    </div>
  );
};

// Grab props needed to display in component
OrderShow.getInitialProps = async (context, client) => {
  // Grab ticket id from url (matches filename for query parm [ticketId])
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  // merge into all diff props from the TicketShow comp above
  return { order: data };
};

export default OrderShow;
