import { useEffect } from 'react';
import { useRequest } from '../../hooks/useRequest';
import Router from 'next/router';

const signout = () => {
  const { executeRequest } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => Router.push('/'),
  });

  // Only run once
  useEffect(() => {
    executeRequest();
  }, []);
  return <div>Signing out...</div>;
};

export default signout;
