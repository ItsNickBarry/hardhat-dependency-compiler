const fs = require('fs');
const path = require('path');
const { HardhatPluginError } = require('hardhat/plugins');
const { name: PLUGIN_NAME } = require('../package.json');

const {
  TASK_COMPILE,
} = require('hardhat/builtin-tasks/task-names');

const { name } = require('../package.json');

const generate = function (dependency) {
  return [
    '// SPDX-License-Identifier: UNLICENSED',
    'pragma solidity >0.0.0;',
    `import '${ dependency }';`,
  ].map(l => `${ l }\n`).join('');
};

task(TASK_COMPILE, async function (args, hre, runSuper) {
  const config = hre.config.dependencyCompiler;

  // sources path must be "resolved" for compatibility with @nomicfoundation/hardhat-foundry package
  const sources = path.resolve(hre.config.paths.sources);

  const directory = path.resolve(sources, config.path);
  const tracker = path.resolve(directory, `.${ name }`);

  if (!directory.startsWith(sources)) {
    throw new HardhatPluginError(PLUGIN_NAME, 'resolved path must be inside of sources directory');
  }

  if (directory === sources) {
    throw new HardhatPluginError(PLUGIN_NAME, 'resolved path must not be sources directory');
  }

  if (fs.existsSync(directory)) {
    // delete directory only if tracker is found or directory is empty
    if (fs.existsSync(tracker) || fs.readdirSync(directory).length == 0) {
      fs.rmSync(directory, { recursive: true });
    } else {
      throw new HardhatPluginError(PLUGIN_NAME, `temporary source directory must have been generated by ${ name }`);
    }
  }

  fs.mkdirSync(directory);
  fs.writeFileSync(tracker, `directory approved for write access by ${ name }\n`);

  for (let dependency of config.paths) {
    const fullPath = path.join(directory, dependency);

    if (!fs.existsSync(path.dirname(fullPath))) {
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    }

    fs.writeFileSync(fullPath, generate(dependency));
  }

  try {
    await runSuper();
  } finally {
    if (!config.keep) {
      fs.rmSync(directory, { recursive: true });
    }
  }
});
