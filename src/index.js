import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import parseOptions from './commit/index'

const argv = yargs(hideBin(process.argv)).argv
parseOptions(argv)
// yargs(hideBin(process.argv))
//   .command(
//     ['commit', 'c'],
//     'Commit message Generator',
//     (yargs) => {
//       return yargs.option('add', {
//         alias: 'a',
//         demand: false,
//         describe: 'Whether to submit the current changes to the Stage',
//         type: 'boolean'
//       })
//     },
//     (argv) => {
//       import('./commit/index.js').then(({ default: parseOptions }) => {
//         parseOptions(argv);
//       });
//     }
//   )
//   .command(
//     ['use'],
//     'Some Command Interpretation',
//     (argv) => {
//       import('./help/index.js').then(({ default: help }) => {
//         help(argv);
//       });
//     }
//   )
//   .parse()