const path = require('path');

module.exports = {
  webpack: (config, { isServer }) => {
    // Solo aplica la configuración en el lado del servidor
    if (isServer) {
      config.watchOptions = {
        ...config.watchOptions,
        poll: 500,
        aggregateTimeout: 300,
      };

      // Configura la recompilación cuando se añade una nueva página
      config.plugins.push(
        new (require('webpack')).WatchIgnorePlugin({
          paths: [path.join(__dirname, 'node_modules'), path.join(__dirname, '.next')],
        })
      );
    }

    return config;
  },
};