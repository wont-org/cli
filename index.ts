import { command, parse, version } from 'commander';

// commands
import { dev } from './commands/dev'
import { build } from './commands/build'
version(`wont-cli 1.0.0`)

command('build')
  .description('Compile site in production mode')
  .action(build);

command('dev')
  .description('Run webpack dev server')
  .action(dev);

parse()