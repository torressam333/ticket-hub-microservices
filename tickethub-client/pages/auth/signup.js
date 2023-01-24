import React from 'react';

const signup = () => {
  return (
    <form className='container pt-4'>
      <h1>Sign Up</h1>
      <div class='form-group'>
        <label for='exampleInputEmail1'>Email address</label>
        <input
          type='email'
          class='form-control'
          aria-describedby='emailHelp'
          placeholder='Enter email'
        />
      </div>
      <div class='form-group'>
        <label for='password'>Password</label>
        <input type='password' class='form-control' placeholder='Password' />
      </div>
      <button type='submit' class='btn btn-primary mt-2'>
        Sign Up
      </button>
    </form>
  );
};

export default signup;
