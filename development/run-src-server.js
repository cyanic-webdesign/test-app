require('babel-core/register')({
  only: /webpack\.config\.js$/,
});

const universalWebpack = require('universal-webpack');
const settings = require('./universal-webpack-settings');
const webpackConfig = require('./webpack.config.js').default;
const path = require('path');

require('dotenv').config({
  path: path.resolve(__dirname, '..', '.env'), // eslint-disable-line global-require
});

universalWebpack.server(webpackConfig, settings);
