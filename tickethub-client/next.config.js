module.exports = {
  webpack: (config) => {
    config.watchOptions.poll = 200;

    return config;
  },
};
