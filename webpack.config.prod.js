const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const baseConfig = require('./webpack.config.base.js');


module.exports = (env) => {
  const uglify = env && env.uglify;
  const plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ];

  if (uglify) {
    plugins.push(new webpack.optimize.UglifyJsPlugin());
  }

  return merge(baseConfig, {
    entry: './src/index.jsx',
    output: {
      path: path.resolve('bundle'),
      filename: uglify ? 'redux-snake.min.js' : 'redux-snake.js',
    },
    plugins: plugins,
  });
};
