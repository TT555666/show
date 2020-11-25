/* craco.config.js */
const CracoLessPlugin = require("craco-less");
const defaultOptions = require('./defaultOptions')
module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: defaultOptions,
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
