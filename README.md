# Hardhat Dependency Compiler

Compile Solidity sources directly from NPM dependencies.

## Installation

```bash
npm install --save-dev hardhat-dependency-compiler
# or
yarn add --dev hardhat-dependency-compiler
```

## Usage

Load plugin in Hardhat config:

```javascript
require('hardhat-dependency-compiler');
```

Add configuration under the `dependencyCompiler` key:

| option  | description                                                                                                                                  | default                           |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `paths` | `Array` of dependency paths to compile                                                                                                       | `[]`                              |
| `path`  | path to temporary directory where dependencies are imported (relative to Hardhat sources directory)                                          | `'./hardhat-dependency-compiler'` |
| `keep`  | whether to keep temporary file directory after compilation is complete (directory will still be deleted and regenerated on each compilation) | `false`                           |

```javascript
dependencyCompiler: {
  paths: [
    '@solidstate/contracts/interfaces/IERC20.sol',
  ],
}
```

## Development

Install dependencies via Yarn:

```bash
yarn install
```

Setup Husky to format code on commit:

```bash
yarn prepare
```
