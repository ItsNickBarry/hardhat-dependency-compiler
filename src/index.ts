import { name as pluginName } from '../package.json';
import './tasks/compile';
import { extendConfig } from 'hardhat/config';
import 'hardhat/types/config';

declare module 'hardhat/types/config' {
  interface HardhatUserConfig {
    dependencyCompiler?: {
      paths?: string[];
      path?: string;
      keep?: boolean;
    };
  }

  interface HardhatConfig {
    dependencyCompiler: {
      paths: string[];
      path: string;
      keep: boolean;
    };
  }
}

extendConfig(function (config, userConfig) {
  config.dependencyCompiler = Object.assign(
    {
      paths: [],
      path: `./${pluginName}`,
      keep: false,
    },
    userConfig.dependencyCompiler,
  );
});
