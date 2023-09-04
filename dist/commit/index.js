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
/*
 * @Author: ChenYaJin
 * @Date: 2023-09-04 09:15:17
 * @LastEditors: ChenYaJin
 * @LastEditTime: 2023-09-04 15:14:48
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
const commitMessageByPrompt = () => {
  (0, _inquiry.inquiryProcess)().then(answer => {
    const {
      type,
      scope,
      subject,
      body,
      footer
    } = answer;
    let message = scope ? type + '(' + scope + ')' : type;
    message += `: ${subject}`;
    (0, _commit.commit)(process.cwd(), message, {}, function (error) {
      if (error) {
        console.log(error);
        return;
      }
      (0, _log.log)(process.cwd(), function (logOutput) {
        console.log(logOutput);
      });
    });
  });
};

/**
 * confirm message by input
 */
const commitMessageByInput = message => {
  const matches = (0, _validate.resolvePatterns)(message);
  console.log('matches', matches);
};
var _default = parseOptions;
exports.default = _default;