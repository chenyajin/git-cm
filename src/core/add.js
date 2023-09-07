/*
 * @Author: ChenYaJin
 * @Date: 2023-09-04 09:15:17
 * @LastEditors: ChenYaJin
 * @LastEditTime: 2023-09-04 09:48:13
 * @Description: add core
 */
import childProcess from 'child_process';

export {
  addAll,
  addPath,
  addFile,
  commitFile
}

/**
 * shell of 'git add .'
 * @param {boolean} isAdd adds all changes to git staging
 * @returns Promise
 */
async function addAll (isAdd) {
  return new Promise((resolve, reject) => {
    if (isAdd) {
      childProcess.exec(`git add .`, () => {
        resolve()
      })
    } else {
      resolve()
    }
  })
}
/**
 * Synchronously adds a path to git staging
 */
function addPath (repoPath) {
  childProcess.spawnSync('git', ['add', '.'], { cwd: repoPath });
}

/**
 * Synchronously adds a file to git staging
 */
function addFile (repoPath, filename) {
  childProcess.spawnSync('git', ['add', filename], { cwd: repoPath });
}

/**
 * git commit 
 */
async function commitFile (message, repoPath) {
  return childProcess.spawnSync('git', ['commit', '-m', message], { cwd: repoPath });
}