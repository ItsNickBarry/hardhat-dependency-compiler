import { expect } from 'chai';
import hre from 'hardhat';
import { TASK_CLEAN, TASK_COMPILE } from 'hardhat/builtin-tasks/task-names';

describe(TASK_COMPILE, () => {
  before(async () => {
    await hre.run(TASK_CLEAN);
  });

  beforeEach(async () => {
    await hre.run(TASK_COMPILE);
  });

  afterEach(async () => {
    await hre.run(TASK_CLEAN);
  });

  it('generates artifacts for specified dependency contracts', async () => {
    expect(await hre.artifacts.artifactExists('IWETH'));
  });
});
