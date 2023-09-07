import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import parseOptions from './core/index'
import help from './help/index'

const argv = yargs(hideBin(process.argv)).argv
if (isHelpCommand(argv, argv._)) {
  help(argv);
} else {
  parseOptions(argv)
}

/**
 * 
 */
function isHelpCommand (argv, command = []) {
  const { use, u, h } = argv
  return use || u || h || command.includes('use') || command.includes('u')
}