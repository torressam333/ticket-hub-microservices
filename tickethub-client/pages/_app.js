import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/buildClient';
import Header from '../components/Header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      {/* Place holder for now */}
      <Header currentUser={currentUser} />
      <div className='container-xxl'>
        <Component {...pageProps} currentUser={currentUser} />
      </div>
    </div>
  );
};

// Fetch data during SSR process
AppComponent.getInitialProps = async ({ ctx, Component }) => {
  const client = buildClient(ctx);
  const { data } = await client.get('/api/users/currentUser');

  let pageProps = {};

  if (Component.getInitialProps) {
    // Call gInProp method from LandingPage
    pageProps = await Component.getInitialProps(ctx, client, data.currentUser);
  }

  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
