import { useState } from 'react';
import axios from 'axios';

const signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const signUpSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/users/signup', {
        email,
        password,
      });

      console.log(response.data);
    } catch (err) {
      setErrors(err.response.data.errors);
    }
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
      {errors.length > 0 && (
        <div className='alert alert-danger'>
          <h4>Something went wrong:</h4>
          <ul className='my-0'>
            {errors &&
              errors.map((err) => <li key={err.message}>{err.message}</li>)}
          </ul>
        </div>
      )}
      <button className='btn btn-primary mt-2'>Sign Up</button>
    </form>
  );
};

export default signup;
