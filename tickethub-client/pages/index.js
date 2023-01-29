import React from 'react';
import buildClient from '../api/buildClient';

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);

  return <h1>Landing Page</h1>;
};

// Fetch data during SSR process
LandingPage.getInitialProps = async (context) => {
  // let currentUser;
  // try {
  //   const { data } = await buildClient(context).get('/api/users/currentUser');

  //   currentUser = data;
  // } catch (error) {
  //   console.error(error);
  // }

  // // Get initial props expects an obj as ret value
  // // hence the in/out scope currentUser var
  // return { currentUser };

  const { data } = await buildClient(context).get('/api/users/currentuser');

  return data;
};

export default LandingPage;
