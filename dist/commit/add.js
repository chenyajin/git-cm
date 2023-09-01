"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addFile = addFile;
exports.addPath = addPath;
exports.commitFile = commitFile;
var _child_process = _interopRequireDefault(require("child_process"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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