# Hardhat Dependency Compiler

Compile Solidity sources directly from NPM dependencies.

## Installation

```bash
yarn add --dev hardhat-dependency-compiler
```

## Usage

Load plugin in Hardhat config:

```javascript
require('hardhat-dependency-compiler');
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
