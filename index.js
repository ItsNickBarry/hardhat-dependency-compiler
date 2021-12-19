const { extendConfig } = require('hardhat/config');

const { name } = require('./package.json');

require('./tasks/compile.js');

extendConfig(function (config, userConfig) {
  config.dependencyCompiler = Object.assign(
    {
      paths: [],
      path: `./${ name }`,
      keep: false,
    },
    userConfig.dependencyCompiler
  );
});
