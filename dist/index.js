"use strict";

var _yargs = _interopRequireDefault(require("yargs"));
var _helpers = require("yargs/helpers");
var _index = _interopRequireDefault(require("./core/index"));
var _index2 = _interopRequireDefault(require("./help/index"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const argv = (0, _yargs.default)((0, _helpers.hideBin)(process.argv)).argv;
if (isHelpCommand(argv, argv._)) {
  (0, _index2.default)(argv);
} else {
  (0, _index.default)(argv);
}

/**
 * 
 */
function isHelpCommand(argv, command = []) {
  const {
    use,
    u,
    h
  } = argv;
  return use || u || h || command.includes('use') || command.includes('u');
}