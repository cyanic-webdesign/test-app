import path from 'path';
import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WebpackNotifierPlugin from 'webpack-notifier';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import headerFooterManifestJSON from '@wehkamp/blaze-lib-headerfooter-components/lib/manifest.json';

process.noDeprecation = true;

const development = process.env.NODE_ENV === 'development';
const target = process.env.npm_lifecycle_event;

export const cssModuleNames = '[name]__[local]___[hash:base64:5]';

// ENTRIES
const entries = [path.resolve(__dirname, '..', 'src', 'client', 'index')];

// PLUGINS
const plugins = [
  new webpack.DefinePlugin({
    webpackVars: {
      headerFooterManifest: JSON.stringify(headerFooterManifestJSON),
    },
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  }),
  new CopyWebpackPlugin([{
    context: './node_modules/@wehkamp/blaze-lib-headerfooter-components/lib',
    from: '**/css/*.css',
    to: './',
  }, {
    context: './node_modules/@wehkamp/blaze-lib-headerfooter-components/lib',
    from: '**/img/*.*',
    to: './',
  }, {
    context: './node_modules/@wehkamp/blaze-lib-headerfooter-redux-components/lib',
    from: '**/img/*.*',
    to: './',
  }]),
  new WebpackNotifierPlugin(),
  new ExtractTextPlugin({
    filename: '[name].[contenthash:8].css',
    allChunks: true,
  }),
];

if (target === 'bundle') {
  plugins.push(new BundleAnalyzerPlugin());
}

// PLUGINS
const environmentPlugins = development ? [
  new webpack.NoEmitOnErrorsPlugin(),
] : [
  new webpack.optimize.UglifyJsPlugin({
    compressor: { warnings: false },
    output: { comments: false },
  }),
];

// LOADERS
const jsLoaders = [{ loader: 'babel-loader' }];
const cssLoaderConfig = [{
  loader: 'css-loader',
  options: {
    modules: true,
    importLoaders: 1,
    localIdentName: `${cssModuleNames}`,
    discardComments: true,
    sourceMap: true,
    ignore: '/node_modules/',
  },
}, {
  loader: 'postcss-loader',
  options: {
    sourceMap: true,
    ignore: '/node_modules/',
  },
}, {
  loader: 'sass-loader',
  options: {
    outputStyle: 'compressed',
    sourceMap: true,
    ignore: '/node_modules/',
  },
}];
const loaders = [{
  test: /favicon\.ico$/,
  use: [{
    loader: 'file-loader',
    options: {
      name: 'favicon.ico',
    },
  }],
}, {
  // eslint-disable-next-line no-useless-escape
  test: '/@wehkamp\/blaze-component-/',
  use: jsLoaders,
}, {
  test: /\.js$/,
  use: jsLoaders,
  include: [path.resolve(__dirname, '..', 'src')],
}, {
  test: /\.html$/,
  use: [{
    loader: 'html-loader',
  }],
}, {
  test: /\.(ttf|eot|svg|woff(2)?)$/,
  use: [{
    loader: 'file-loader',
    options: {
      name: '[name].[hash:8].[ext]',
    },
  }],
}, {
  test: /\.(jpe?g|png|gif)$/i,
  use: [{
    loader: 'url-loader',
    options: {
      limit: 4096,
      name: '[name].[hash:8].[ext]',
    },
  }],
}];

const environmentLoaders = development ? [{
  test: /\.(css|scss)$/,
  use: [{ loader: 'style-loader' }, ...cssLoaderConfig],
  exclude: [/node_modules/],
}] : [{
  test: /\.(css|scss)$/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: cssLoaderConfig,
  }),
}];

export default {
  devtool: 'cheap-module-source-map',
  entry: [...entries],
  context: path.resolve(__dirname, '..'),
  output: {
    path: path.resolve(__dirname, '..', 'dist', 'public'),
    filename: '[name].[hash:8].js',
    libraryTarget: 'umd',
  },
  plugins: [...plugins, ...environmentPlugins],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [...loaders, ...environmentLoaders],
  },
};
