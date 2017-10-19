import dotenv from 'dotenv';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import config from './webpack.client.config.babel';

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const {
  DEV_PROXY_TARGET = 'https://www.nl.wehkamp.dev.blaze-public.ps',
  WEBPACK_DEV_SERVER_PORT = 8080,
  WEBSITE_PORT = 5000 } = process.env;
const host = '0.0.0.0';

config.entry.unshift(
  'react-hot-loader/patch',
  'webpack-dev-server/client?http://localhost:8080/',
  'webpack/hot/only-dev-server',
);
config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.plugins.push(new webpack.NamedModulesPlugin());

new WebpackDevServer(webpack(config), {
  contentBase: path.resolve(__dirname, 'dist'),
  disableHostCheck: true,
  historyApiFallback: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  hot: true,
  proxy: {
    '/service/**': {
      target: DEV_PROXY_TARGET,
      secure: true,
      changeOrigin: true,
    },
    '*': `http://localhost:${WEBSITE_PORT}`,
  },
  publicPath: config.output.publicPath,
  stats: 'errors-only',
}).listen(WEBPACK_DEV_SERVER_PORT, host, (err) => {
  // eslint-disable-next-line no-console
  console.log(err || `Listening at ${host}:${WEBPACK_DEV_SERVER_PORT}`);
});
