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

export async function install(deps?: string[]) {
    deps = deps || []
    consola.info('Install Dependencies...\n');
    spawn('npm', ['install', ...deps], {
        stdio: 'inherit',
    })
}