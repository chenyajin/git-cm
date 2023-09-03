"use strict";

var _yargs = _interopRequireDefault(require("yargs"));
var _helpers = require("yargs/helpers");
var _index = _interopRequireDefault(require("./commit/index"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const argv = (0, _yargs.default)((0, _helpers.hideBin)(process.argv)).argv;
(0, _index.default)(argv);
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