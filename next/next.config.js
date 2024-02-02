module.exports = {
    webpack: (config, _) => ({
      ...config,
      watchOptions: {
        ...config.watchOptions,
        poll: 500,
        aggregateTimeout: 300,
      },
    }),
  }