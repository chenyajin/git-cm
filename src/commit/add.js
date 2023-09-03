import childProcess from 'child_process';

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
export {
  addPath,
  addFile,
  commitFile
}