import { useState } from 'react';
import { useRequest } from '../../hooks/useRequest';
import Router from 'next/router';

/**React component to create a new ticket */
const NewTicket = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const { executeRequest, errors } = useRequest({
    url: '/api/tickets',
    method: 'post',
    body: { title, price },
    onSuccess: () => Router.push('/'),
  });

  const formatPrice = () => {
    // Format user inputed price
    const value = parseFloat(price);

    if (isNaN(value)) return;

    setPrice(value.toFixed(2)); // 12.00
  };

  const submitForm = (e) => {
    e.preventDefault();

    executeRequest();
  };

  return (
    <div>
      <h1>Create a Ticket</h1>
      <form onSubmit={submitForm}>
        <div className='mb-3'>
          <label htmlFor='title' className='form-label'>
            Title
          </label>
          <input
            type='text'
            className='form-control'
            id='title'
            placeholder='Enter a title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='price' className='form-label'>
            Price
          </label>
          <input
            type='price'
            className='form-control'
            id='price'
            placeholder='Enter a price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            onBlur={formatPrice}
          />
        </div>
        {errors}
        <button className='btn btn-primary'>Submit</button>
      </form>
    </div>
  );
};

export default NewTicket;
