import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { App, AppProps, WorkflowProps, Workflow } from '../src';

/**
 * A util function returning an instance of App with a outdir set to a temp directory
 * @param options AppProps to provide to the new App
 */
export const TestingApp = (options: Partial<AppProps> = {}) => new App(
  {
    ...options,
    outdir: fs.mkdtempSync(path.join(os.tmpdir(), 'cdkactions.outdir.')),
  },
);

/**
 * A util function returning an instance of Workflow with the minimum configuration.
 * @param options WorkflowProps to provide to the Workflow
 */
export const TestingWorkflow = (options: Partial<WorkflowProps> = {}) => new Workflow(undefined as any, 'test',
  {
    name: 'Test',
    on: 'pullRequest',
    ...options,
  },
);
