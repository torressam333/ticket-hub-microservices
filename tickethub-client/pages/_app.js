import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/buildClient';
import Header from '../components/Header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      {/* Place holder for now */}
      <Header currentUser={currentUser} />
      <Component {...pageProps} currentUser={currentUser} />;
    </div>
  );
};

// Fetch data during SSR process
AppComponent.getInitialProps = async ({ ctx, Component }) => {
  const { data } = await buildClient(ctx).get('/api/users/currentUser');

  let pageProps = {};

  if (Component.getInitialProps) {
    // Call gInProp method from LandingPage
    pageProps = await Component.getInitialProps(ctx);
  }

  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
