"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inquiryProcess = inquiryProcess;
var _inquirer = _interopRequireDefault(require("inquirer"));
var _utils = require("../utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @Author: ChenYaJin
 * @Date: 2023-09-04 09:15:17
 * @LastEditors: ChenYaJin
 * @LastEditTime: 2023-09-04 10:41:15
 * @Description: inquiry process
 */

const config = (0, _utils.readLocalConfig)();
function inquiryProcess() {
  return new Promise((resolve, reject) => {
    _inquirer.default.prompt([{
      type: 'list',
      name: 'type',
      message: `(type) Select the type of change that you're committing: (Use arrow keys)`,
      choices: config.types
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