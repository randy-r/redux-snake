const path = require('path');
const merge = require('webpack-merge');

const baseConfig = require('./webpack.config.base.js');


module.exports = (env) => {
  const sourceMaps = env && env.sourceMaps;
  const config = merge(baseConfig, {
    entry: './example/index.jsx',
    output: {
      path: path.resolve('example'),
      filename: 'bundle.js',
    },
    devServer: {
      contentBase: path.join(__dirname, 'example'),
    },
    devtool: sourceMaps ? 'inline-source-map' : undefined,
  });

  config.entry = './example/index.jsx';
  return config;
};
