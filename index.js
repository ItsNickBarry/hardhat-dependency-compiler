const fs = require('fs');
const path = require('path');
const { extendConfig } = require('hardhat/config');
const rimraf = require('rimraf');
const { TASK_COMPILE } = require('hardhat/builtin-tasks/task-names');

extendConfig(function (config, userConfig) {
  config.dependencyCompiler = Object.assign(
    {
      paths: [],
    },
    userConfig.dependencyCompiler
  );
});

const generate = function (dependency) {
  return `
  // SPDX-License-Identifier: UNLICENSED
  pragma solidity *;
  import '${dependency}';
  `;
};

task(TASK_COMPILE, async function (args, hre, runSuper) {
  const directory = `${hre.config.paths.sources}/_hardhat-dependency-compiler`;

  if (fs.existsSync(directory)) {
    throw 'hardhat-dependency-compiler: temporary source directory must not exist';
  }

  fs.mkdirSync(directory);

  for (let dependency of hre.config.dependencyCompiler.paths) {
    const fullPath = path.join(directory, dependency);

    if (!fs.existsSync(path.dirname(fullPath))) {
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    }

    fs.writeFileSync(fullPath, generate(dependency));
  }

  try {
    await runSuper();
  } finally {
    await rimraf(directory, function (err) {
      if (err) {
        throw err;
      }
      // done
    });
  }
});
