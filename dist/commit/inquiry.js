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
 * @LastEditTime: 2023-09-04 11:59:47
 * @Description: inquiry process
 */

function inquiryProcess() {
  return new Promise((resolve, reject) => {
    _inquirer.default.prompt([{
      type: 'list',
      name: 'type',
      message: _utils.config.messages.type,
      choices: _utils.config.types
    }, {
      type: 'input',
      name: 'scope',
      message: _utils.config.messages.scope,
      when: !_utils.config.skipQuestions.includes('scope'),
      validate: function (val) {
        if (_utils.config.scopeRequired && !val.trim()) {
          return "Cannot be empty";
        }
        return true;
      }
    }, {
      type: 'input',
      name: 'subject',
      message: _utils.config.messages.subject,
      validate: function (val) {
        if (!val.trim()) {
          return "Cannot be empty";
        }
        if (_utils.config.subjectLimit && val.length > _utils.config.subjectLimit) {
          return `No more than ${_utils.config.subjectLimit} words`;
        }
        return true;
      }
    }, {
      type: 'input',
      name: 'body',
      message: _utils.config.messages.body,
      when: !_utils.config.skipQuestions.includes('body')
    }, {
      type: 'input',
      name: 'footer',
      message: _utils.config.messages.footer,
      when: !_utils.config.skipQuestions.includes('footer')
    }]).then(answers => {
      resolve(answers);
    }).catch(error => {
      reject(error);
    });
  });
}