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
    permissions: {
      'id-token': 'write',
      'contents': 'write',
    },
    steps: [{
      name: 'step',
      continueOnError: false,
      timeoutMinutes: 5,
      workingDirectory: '~/',
    },
    {
      name: 'External action',
      uses: 'actions/checkout@v2',
      with: {
        stringValue: 'string',
        numberValue: 10,
        booleanValue: false,
      },
    }],
  });
  expect(job.toGHAction()).toMatchSnapshot();
});
