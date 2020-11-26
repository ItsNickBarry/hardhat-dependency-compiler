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

```javascript
dependencyCompiler: {
  paths: [
    '@openzeppelin/contracts/token/ERC20/IERC20.sol',
  ],
}
```
