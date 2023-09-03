"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _message = require("./message");
var _log = require("./log");
var _commit = require("./commit");
const parseOptions = async options => {
  (0, _message.commitPrompt)().then(answer => {
    const {
      type,
      scope,
      subject,
      body,
      footer
    } = answer;
    let message = scope ? type + '(' + scope + ')' : type;
    message += `: ${subject}`;
    const add = options.add || options.a;
    (0, _commit.commit)(process.cwd(), add, message, {}, function (error) {
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
var _default = parseOptions;
exports.default = _default;