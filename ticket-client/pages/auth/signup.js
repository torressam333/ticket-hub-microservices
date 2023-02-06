import Authenticate from './authenticate';

const signin = () => {
  return <Authenticate pagetitle='Sign Up' apiurl='/api/users/signup' />;
};

export default signin;
