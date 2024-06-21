import { name as pluginName } from '../../package.json';
import fs from 'fs';
import { TASK_COMPILE } from 'hardhat/builtin-tasks/task-names';
import { task } from 'hardhat/config';
import { HardhatPluginError } from 'hardhat/plugins';
import path from 'path';

const generate = function (dependency: string) {
  return [
    '// SPDX-License-Identifier: UNLICENSED',
    'pragma solidity >0.0.0;',
    `import '${dependency}';`,
  ]
    .map((l) => `${l}\n`)
    .join('');
};

task(TASK_COMPILE, async function (args, hre, runSuper) {
  const config = hre.config.dependencyCompiler;

  // other packages may incorrectly set a relative sources path so it must be explicitly resolved
  const sources = path.resolve(hre.config.paths.sources);

  const directory = path.resolve(sources, config.path);
  const tracker = path.resolve(directory, `.${pluginName}`);

  if (!fs.existsSync(sources)) {
    fs.mkdirSync(sources);
  }

  if (!directory.startsWith(sources)) {
    throw new HardhatPluginError(
      pluginName,
      'resolved path must be inside of sources directory',
    );
  }

  if (directory === sources) {
    throw new HardhatPluginError(
      pluginName,
      'resolved path must not be sources directory',
    );
  }

  if (fs.existsSync(directory)) {
    // delete directory only if tracker is found or directory is empty
    if (fs.existsSync(tracker) || fs.readdirSync(directory).length == 0) {
      fs.rmSync(directory, { recursive: true });
    } else {
      throw new HardhatPluginError(
        pluginName,
        `temporary source directory must have been generated by ${pluginName}`,
      );
    }
  }

  fs.mkdirSync(directory);
  fs.writeFileSync(
    tracker,
    `directory approved for write access by ${pluginName}\n`,
  );

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