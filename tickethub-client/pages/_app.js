import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/buildClient';

const AppComponent = ({ Component, pageProps }) => {
  return (
    <div>
      <h2>Header</h2>
      <Component {...pageProps} />;
    </div>
  );
};

// Fetch data during SSR process
AppComponent.getInitialProps = async ({ ctx }) => {
  let currentUser;
  try {
    const { data } = await buildClient(ctx).get('/api/users/currentUser');

    console.log('HERE');
    console.log(data);

    currentUser = data;
  } catch (error) {
    console.error(error);
  }

  return currentUser;
};

export default AppComponent;
