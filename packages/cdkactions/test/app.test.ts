import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { Construct } from 'constructs';
import { Stack, Workflow, App } from '../src';
import { TestingApp } from './utils';


test('no params', () => {
  const app = new App();
  expect(app.outdir).toBe('../workflows');
});

test('no validation workflow -> no files', () => {
  const app = TestingApp({ createValidateWorkflow: false });
  app.synth();
  expect(fs.readdirSync(app.outdir)).toHaveLength(0);
});

test('validation workflow -> 1 file', () => {
  const app = TestingApp();
  app.synth();
  expect(fs.readdirSync(app.outdir)).toEqual([
    'cdkactions_validate.yaml',
  ]);
});

test('app with 2 workflows -> 2 files', () => {
  const app = TestingApp({ createValidateWorkflow: false });
  class MyStack extends Stack {
    constructor(scope: Construct, name: string) {
      super(scope, name);
      new Workflow(this, 'one', { name: 'one', on: 'push' });
      new Workflow(this, 'two', { name: 'two', on: 'push' });
    }
  }
  new MyStack(app, 'stack');
  app.synth();

  expect(fs.readdirSync(app.outdir)).toEqual([
    'cdkactions_one.yaml',
    'cdkactions_two.yaml',
  ]);
});

test('create directory if not exists', () => {
  const outdir = fs.mkdtempSync(path.join(os.tmpdir(), 'cdkactions.outdir.'));
  fs.rmdirSync(outdir);
  const app = new App({ outdir });
  app.synth();
  expect(fs.readdirSync(app.outdir)).toEqual([
    'cdkactions_validate.yaml',
  ]);
});

