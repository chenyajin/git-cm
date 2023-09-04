"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addAll = addAll;
exports.addFile = addFile;
exports.addPath = addPath;
exports.commitFile = commitFile;
var _child_process = _interopRequireDefault(require("child_process"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @Author: ChenYaJin
 * @Date: 2023-09-04 09:15:17
 * @LastEditors: ChenYaJin
 * @LastEditTime: 2023-09-04 09:48:13
 * @Description: add core
 */

/**
 * shell of 'git add .'
 * @param {boolean} isAdd adds all changes to git staging
 * @returns Promise
 */
async function addAll(isAdd) {
  return new Promise((resolve, reject) => {
    if (isAdd) {
      _child_process.default.exec(`git add .`, () => {
        resolve();
      });
    } else {
      resolve();
    }
  });
}
/**
 * Synchronously adds a path to git staging
 */
function addPath(repoPath) {
  _child_process.default.spawnSync('git', ['add', '.'], {
    cwd: repoPath
  });
}

/**
 * Synchronously adds a file to git staging
 */
function addFile(repoPath, filename) {
  _child_process.default.spawnSync('git', ['add', filename], {
    cwd: repoPath
  });
}

/**
 * git commit 
 */
async function commitFile(message, repoPath) {
  return _child_process.default.spawnSync('git', ['commit', '-m', message], {
    cwd: repoPath
  });
}