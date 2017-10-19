// eslint-disable-next-line import/no-unresolved
require('./libserver.js')({
  // eslint-disable-next-line import/no-unresolved, global-require
  chunks: () => require('./webpack-chunks.json'),
});
