"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _inquiry = require("./inquiry");
var _log = require("./log");
var _commit = require("./commit");
var _add = require("./add");
var _validate = require("./validate");
var _utils = require("../utils");
/*
 * @Author: ChenYaJin
 * @Date: 2023-09-04 09:15:17
 * @LastEditors: ChenYaJin
 * @LastEditTime: 2023-09-15 11:50:40
 * @Description: options parse
 */

/**
 * git-cm -a
 * git-cm -am
 * git-cm -am 'feat: 11'
 */
const parseOptions = async options => {
  const add = options.a || options.add;
  const message = options.m || options.message;
  await (0, _add.addAll)(add);
  if (message && typeof message === 'string') {
    commitMessageByInput(message);
  } else {
    commitMessageByPrompt();
  }
};

/**
 * confirm message by prompt
 */
function commitMessageByPrompt() {
  (0, _inquiry.inquiryProcess)().then(answer => {
    const {
      type,
      scope,
      subject,
      body,
      footer
    } = answer;
    commitByMessage(type, scope, subject);
  });
}

/**
 * confirm message by input
 */
function commitMessageByInput(message) {
  const isValid = (0, _validate.validateMessage)(message);
  if (isValid) {
    const {
      type,
      scope,
      subject
    } = (0, _validate.resolvePatterns)(message, []);
    commitByMessage(type, scope, subject);
  }
}
function commitByMessage(type, scope, subject) {
  let message = scope ? type + '(' + scope + ')' : type;
  message += `: ${subject}`;
  (0, _commit.commit)(process.cwd(), message, {}, function (error) {
    if (error) {
      console.log(error);
      return;
    } else {
      (0, _log.log)(process.cwd(), function (logOutput) {
        console.log(logOutput);
      });
    }
  });
}
var _default = parseOptions;
exports.default = _default;