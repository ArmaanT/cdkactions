import { spawn, SpawnOptions } from 'child_process';
import * as path from 'path';


export async function shell(program: string, args: string[] = [], options: SpawnOptions = {}) {
  const command = `"${program} ${args.join(' ')}" at ${path.resolve(options.cwd ?? '.')}`;
  return new Promise((ok, ko) => {
    const child = spawn(program, args, { stdio: 'inherit', ...options });
    child.once('error', err => {
      throw new Error(`command ${command} failed: ${err}`);
    });
    child.once('exit', code => {
      if (code === 0) {
        return ok();
      } else {
        return ko(new Error(`command ${command} returned a non-zero exit code ${code}`));
      }
    });
  });
}
