import { Job } from '../src';

test('toGHAction', () => {
  const job = new Job(undefined as any, 'test', {
    runsOn: 'ubuntu-latest',
    continueOnError: true,
    timeoutMinutes: 10,
    strategy: {
      fastFail: true,
      maxParallel: 11,
    },
    steps: [{
      name: 'step',
      continueOnError: false,
      timeoutMinutes: 5,
      workingDirectory: '~/',
    }],
  });
  expect(job.toGHAction()).toMatchSnapshot();
});
