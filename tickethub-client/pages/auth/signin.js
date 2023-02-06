import Authenticate from './authenticate';

const signin = () => {
  return <Authenticate pagetitle='Sign In' apiurl='/api/users/signin' />;
};

export default signin;
