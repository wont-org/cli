import consola from 'consola'
import { execSync, spawnSync } from 'child_process'

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

export function install(deps?: string[]) {
    deps = deps || []
    consola.info('\n Install Dependencies', ...deps);
    spawnSync('npm', ['install', ...deps], {
        stdio: 'inherit',
    })
}