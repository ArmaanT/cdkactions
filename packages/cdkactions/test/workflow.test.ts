import { Construct } from 'constructs';
import { Job } from '../src';
import { TestingWorkflow } from './utils';

test('toGHAction', () => {
  const workflow = TestingWorkflow({
    name: 'Test',
    on: {
      pullRequest: {
        types: ['opened'],
        paths: ['test/'],
        pathsIgnore: ['ignore-path/'],
      },
      issueComment: { types: ['created'] },
    },
    defaults: {
      run: {
        workingDirectory: '~/',
      },
    },
    permissions: {
      'id-token': 'write',
      'contents': 'write',
    },
  });
  expect(workflow.toGHAction()).toMatchSnapshot();
});

test('on: string snake conversion', () => {
  const workflow = TestingWorkflow();
  expect(workflow.toGHAction().on).toBe('pull_request');
});

test('on: string[] snake conversion', () => {
  const workflow = TestingWorkflow({
    on: ['pullRequest', 'push', 'issueComment'],
  });
  const expected = ['pull_request', 'push', 'issue_comment'];
  expect(workflow.toGHAction().on).toEqual(expected);
});

test('2 jobs with same key -> error', () => {
  const workflow = TestingWorkflow();
  new Job(workflow, 'job', {
    runsOn: 'ubuntu-latest',
    steps: [],
  });
  expect(() =>
    new Job(workflow, 'job', {
      runsOn: 'ubuntu-latest',
      steps: [],
    }),
  ).toThrowError("There is already a Construct with name 'job' in Workflow [test]");
},
);

test('jobs kept in insertion order', () => {
  const workflow = TestingWorkflow();
  const job_one = 'job_one';
  const job_two = 'job_two';
  const job_three = 'job_three';
  new Job(workflow, job_one, {
    runsOn: 'ubuntu-latest',
    steps: [],
  });
  new Job(workflow, job_two, {
    runsOn: 'ubuntu-latest',
    steps: [],
  });
  new Job(workflow, job_three, {
    runsOn: 'ubuntu-latest',
    steps: [],
  });
  const jobs = Object.keys(workflow.toGHAction().jobs);
  const expected = [job_one, job_two, job_three];
  expect(jobs).toEqual(expected);
},
);

test('non-job children are ignored', () => {
  const workflow = TestingWorkflow();
  new Construct(workflow, 'not_job');
  expect(workflow.toGHAction().jobs).toEqual({});
});
