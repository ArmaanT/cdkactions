import * as fs from 'fs';
import { TestingApp } from './utils';


test('cdkactionsstack', () => {
  const app = TestingApp({ pushUpdatedManifests: true });

  app.synth();
  expect(fs.readdirSync(app.outdir)).toEqual([
    'cdkactions_validate.yaml',
  ]);

  expect(fs.readFileSync(`${app.outdir}/cdkactions_validate.yaml`, 'utf-8')).toMatchSnapshot();
});
