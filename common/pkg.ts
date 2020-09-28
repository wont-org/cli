import consola from 'consola'
import { execSync, spawn } from 'child_process'

let hasYarnCache: boolean;

export function hasYarn() {
  if (hasYarnCache === undefined) {
    try {
      execSync('yarn --version', { stdio: 'ignore' });
      hasYarnCache = true
    } catch (e) {
      hasYarnCache = false;
    }
  }

  return hasYarnCache;
}

type Manager = 'npm' | 'yarn'
export async function install(manager: Manager, deps: string[]) {
  consola.info('Install Dependencies\n');

  spawn(manager, ['install', ...deps, '-S'], {
    stdio: 'inherit',
  })
}