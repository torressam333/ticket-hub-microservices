import React from 'react';
import axios from 'axios';

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);

  return <h1>Landing Page</h1>;
};

// Fetch data during SSR process
LandingPage.getInitialProps = async ({ req }) => {
  let currentUser;
  // In server node env
  if (typeof window === 'undefined') {
    const { data } = await axios.get(
      'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
      {
        Host: 'tickethub.io',
        headers: req.headers,
      }
    );

    currentUser = data;
  } else {
    try {
      // In a browser based env
      const { data } = await axios.get('/api/users/currentuser');

      currentUser = data;
    } catch (error) {
      console.error(error);
    }
  }

  return { currentUser };
};

export default LandingPage;
