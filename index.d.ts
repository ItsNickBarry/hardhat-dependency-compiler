import 'hardhat/types/config';

declare module 'hardhat/types/config' {
  interface HardhatUserConfig {
    dependencyCompiler?: {
      paths?: string[],
      path?: string,
      keep?: boolean,
    }
  }

  interface HardhatConfig {
    dependencyCompiler: {
      paths: string[],
      path: string,
      keep: boolean,
    }
  }
}
