# Hardhat Dependency Compiler

Compile Solidity sources directly from NPM dependencies.

> Versions of this plugin prior to `2.0.0` were released as `hardhat-dependency-compiler`, outside of the `@solidstate` namespace.

## Installation

```bash
npm install --save-dev @solidstate/hardhat-dependency-compiler
# or
yarn add --dev @solidstate/hardhat-dependency-compiler
```

## Usage

Load plugin in Hardhat config:

```javascript
require('@solidstate/hardhat-dependency-compiler');
```

Add configuration under the `dependencyCompiler` key:

| option | description | default |
|-|-|-|
| `paths` | `Array` of dependency paths to compile | `[]` |
| `path` | path to temporary directory where dependencies are imported (relative to Hardhat sources directory) | `'./hardhat-dependency-compiler'` |
| `keep` | whether to keep temporary file directory after compilation is complete (directory will still be deleted and regenerated on each compilation)| `false` |

```javascript
dependencyCompiler: {
  paths: [
    '@openzeppelin/contracts/token/ERC20/IERC20.sol',
  ],
}
```
