"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commit = commit;
var _child_process = require("child_process");
var _path = _interopRequireDefault(require("path"));
var _fs = require("fs");
var _dedent = _interopRequireDefault(require("dedent"));
var _index = require("../utils/index");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @Author: ChenYaJin
 * @Date: 2023-09-04 09:15:17
 * @LastEditors: ChenYaJin
 * @LastEditTime: 2023-09-15 14:51:56
 * @Description: commit core
 */

/**
 * Asynchronously git commit at a given path with a message
 * @param {string} repoPath 当前执行目录
 * @param {string} message 提交信息header(type、scope、subject)
 * @param {object} options
 * @param {function} done 回调函数
 */
function commit(repoPath, message, options, done) {
  commitCore(repoPath, message, options, done);
}

/**
 * shell of 'git commit -m'
 */
function commitCore(repoPath, message, options, done) {
  let called = false;
  if (!options.hookMode) {
    let args = ['commit', '-m', (0, _dedent.default)(message)];
    let child = (0, _child_process.spawn)('git', args);
    child.stdout.on('data', data => {
      console.log('\n', data.toString());
    });
    child.on('error', function (err) {
      if (called) return;
      called = true;
      done(err);
    });
    child.on('exit', function (code, signal) {
      if (called) return;
      called = true;
      if (code) {
        if (code === 128) {
          console.warn(`
            Git exited with code 128. Did you forget to run:

              git config --global user.email "you@example.com"
              git config --global user.name "Your Name"
            `);
        }
        // done(Object.assign(new Error(`git exited with error code ${code}`), { code, signal }));
      } else {
        done(null);
      }
    });
  } else {
    const gitDirPath = (0, _child_process.execSync)('git rev-parse --absolute-git-dir', {
      encoding: 'utf8'
    }).trim();
    const commitFilePath = _path.default.join(gitDirPath, 'COMMIT_EDITMSG');
    try {
      const fd = (0, _fs.openSync)(commitFilePath, 'w');
      try {
        (0, _fs.writeFileSync)(fd, (0, _dedent.default)(message));
        done(null);
      } catch (e) {
        done(e);
      } finally {
        (0, _fs.closeSync)(fd);
      }
    } catch (e) {
      // windows doesn't allow opening existing hidden files
      // in 'w' mode... but it does let you do 'r+'!
      try {
        const fd = (0, _fs.openSync)(commitFilePath, 'r+');
        try {
          (0, _fs.writeFileSync)(fd, (0, _dedent.default)(message));
          done(null);
        } catch (e) {
          done(e);
        } finally {
          (0, _fs.closeSync)(fd);
        }
      } catch (e) {
        done(e);
      }
    }
  }
}