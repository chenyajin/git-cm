"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const help = argv => {
  console.log(`
  simple-cli has two command line tools:

    1) cm         -- used for making commits

    2) git-cm     -- alias for 'cz'

  Detailed usage:
    
    1) cm <sub-command>

        description: Choose different types and enter the main information
                          to complete the submission of the git commit.

        args:
          --add    Whether to submit the current changes to the Stage

  `);
};
var _default = help;
exports.default = _default;