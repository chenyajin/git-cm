"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _message = require("./message");
var _log = require("./log");
var _commit = require("./commit");
var _chai = require("chai");
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
    (0, _commit.commit)(process.cwd(), add, message, {
      disableAppendPaths: true,
      quiet: true,
      emitData: true
    }, function () {
      (0, _log.log)(process.cwd(), function (logOutput) {
        console.log(logOutput);
        // let dummyCommitMessage = `sip sip sippin on some sizzurp`;
        // expect(logOutput).to.have.string(dummyCommitMessage);
        // done();
      });
    });
  });
};
var _default = parseOptions;
exports.default = _default;