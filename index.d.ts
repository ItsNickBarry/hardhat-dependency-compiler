import 'hardhat/types/config';

declare module 'hardhat/types/config' {
  interface HardhatUserConfig {
    dependencyCompiler?: {
      paths?: string[],
    }
  }

  interface HardhatConfig {
    dependencyCompiler: {
      paths: string[],
    }
  }
}
