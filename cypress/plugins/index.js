const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
module.exports = (on, config) => {
  const bundler = createBundler({
    // any ESBuild options here
    // https://esbuild.github.io/api/
  });
  on('file:preprocessor', bundler);
};
