module.exports = {
  exclude_from_externals: [
    /@wehkamp\/blaze-component-/,
  ],
  server: {
    input: './src/server/index.js',
    output: './dist/libserver.js',
  },
};
