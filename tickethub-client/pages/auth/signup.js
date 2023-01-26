import { useState } from 'react';
import { useRequest } from '../../hooks/useRequest';
import Router from 'next/router';

const signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { executeRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: () => Router.push('/'),
  });

  const signUpSubmit = async (event) => {
    event.preventDefault();

    // Use custom req hook
    await executeRequest();
  };

  return (
    <form className='container pt-4' onSubmit={signUpSubmit}>
      <h1>Sign Up</h1>
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
      <button className='btn btn-primary mt-2'>Sign Up</button>
    </form>
  );
};

export default signup;
