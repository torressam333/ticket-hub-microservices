import axios from 'axios';

export default ({ req }) => {
  // Determine which env app is in (srv/browser)
  if (typeof window === 'undefined') {
    return axios.create({
      baseURL:
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers,
    });
  } else {
    // Browser axios instance is default
    return axios.create({});
  }
};
