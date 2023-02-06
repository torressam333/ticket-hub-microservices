import React from 'react';
import buildClient from '../api/buildClient';

const LandingPage = ({ currentUser }) => {
  return !currentUser ? (
    <h1>You are not signed in</h1>
  ) : (
    <h1>You are signed in</h1>
  );
};

// Fetch data during SSR process
LandingPage.getInitialProps = async (context) => {
  let currentUser;
  try {
    const { data } = await buildClient(context).get('/api/users/currentUser');
    currentUser = data;
  } catch (error) {
    console.error(error);
  }

  return currentUser;
};

export default LandingPage;
