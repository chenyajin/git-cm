"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commitPrompt = commitPrompt;
exports.types = void 0;
var _inquirer = _interopRequireDefault(require("inquirer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function commitPrompt() {
  return new Promise((resolve, reject) => {
    _inquirer.default.prompt([{
      type: 'list',
      name: 'type',
      message: `(type) Select the type of change that you're committing: (Use arrow keys)`,
      choices: types
    }, {
      type: 'input',
      name: 'scope',
      message: '(scope) Write a brief description of the scope of impact:'
    }, {
      type: 'input',
      name: 'subject',
      message: '(subject) Write a short, imperative tense description of the change:',
      validate: function (val) {
        if (!val) {
          return "Cannot be empty";
        }
        if (val.length > 50) {
          return "No more than 50 words";
        }
        return true;
      }
    }, {
      type: 'input',
      name: 'body',
      message: '(body) Provide a longer description of change:'
    }, {
      type: 'input',
      name: 'footer',
      message: '(footer) List any breaking changes:'
    }]).then(answers => {
      resolve(answers);
    }).catch(error => {
      reject(error);
    });
  });
}
const types = [{
  value: 'feat',
  name: 'feat:     A new feature '
}, {
  value: 'fix',
  name: 'fix:      A bug fix '
}, {
  value: 'docs',
  name: 'docs:     Documentation only changes '
}, {
  value: 'style',
  name: 'style:    Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc) '
}, {
  value: 'refactor',
  name: 'refactor: A code change that neither fixes a bug nor adds a feature '
}, {
  value: 'perf',
  name: 'perf:     A code change that improves performance'
}, {
  value: 'test',
  name: 'test:     Adding missing tests or correcting existing tests'
}, {
  value: 'cli',
  name: 'cli:      Modify configuration files or scripts for CI'
}, {
  value: 'build',
  name: 'build:    Build tools or modify dependency packages'
}, {
  value: 'chore',
  name: 'chore:    Change the build process or auxiliary tools and libraries such as documentation generation'
}];
exports.types = types;