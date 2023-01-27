import React from 'react';
import { useRequest } from '../hooks/useRequest';

// const { executeRequest, errors } = useRequest({
//   url: '/api/users/currentUser',
//   method: 'get',
// });

const LandingPage = ({ message }) => {
  return <div>{message ? message : ' You are not signed in'}</div>;
};

// Fetch data during SSR process
LandingPage.getInitialProps = async () => {
  console.log('I am on the server');

  return { message: '' };
  // const response = await executeRequest();
  // console.log({ response });

  // if (response.currentUser) return { currentUser: response.currentUser };
};

export default LandingPage;
