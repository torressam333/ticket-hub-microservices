import { useState } from 'react';
import { useRequest } from '../../hooks/useRequest';
import Router from 'next/router';

const authenticate = ({ pagetitle, apiurl }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { executeRequest, errors } = useRequest({
    url: apiurl,
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: () => Router.push('/'),
  });

  const authenticateSubmit = async (event) => {
    event.preventDefault();

    // Use custom req hook
    await executeRequest();
  };

  return (
    <form className='container pt-4' onSubmit={authenticateSubmit}>
      <h1>{pagetitle}</h1>
      <div className='form-group'>
        <label htmlFor='email'>Email address</label>
        <input
          type='email'
          id='email'
          className='form-control'
          aria-describedby='emailHelp'
          placeholder='Enter email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          className='form-control'
          id='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {errors}
      <button className='btn btn-primary mt-2'>{pagetitle}</button>
    </form>
  );
};

export default authenticate;
