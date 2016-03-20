const webpack = require('webpack');

const plugins = [
  new webpack.DefinePlugin({ 'process.env.NODE_ENV': 'development' }),
];

/**
 * Configuration for client webpack (development)
 * @type {Object}
 */
const client = {
  entry: {
    client: './src/client.js',
  },
  output: {
    path: './build/public/',
    filename: 'client.js',
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['', '.js', '.jsx'],
  },
  target: 'web',
  module: {
    loaders: [{
      test: /\.js?$/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015'],
      },
    }],
  },
  cache: true,
  plugins,
  devtool: 'cheap-module-eval-source-map',
};


/**
 * Configuration for server webpack (development)
 * @type {Object}
 */
const server = {
  entry: {
    server: './src/server.js',
  },
  output: {
    path: './build/',
    filename: 'server.js',
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['', '.js', '.jsx'],
  },
  target: 'node',
  module: {
    loaders: [{
      test: /\.js?$/,
      loader: 'babel',
      query: {
        presets: ['node5'],
      },
    }],
  },
  cache: true,
  plugins,
  devtool: 'inline-source-map',
};

module.exports = [client, server];

