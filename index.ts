#!/usr/bin/env node

import { command, parse, version } from 'commander'
import { version as pkgVersion, name } from './package.json'

// commands
import { init } from './commands/init'
import { dev } from './commands/dev'
import { build } from './commands/build'
version(`${name} ${pkgVersion}`)


command('init')
  .description('Init project config')
  .action(init);

command('dev')
  .description('Run webpack dev server')
  .action(dev);

command('build')
  .description('Compile site in production mode')
  .action(build);

parse()