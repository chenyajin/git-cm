import { exec } from 'child_process';

export { log };

/**
 * Asynchronously gets the git log output
 */
function log (repoPath, done) {
  exec('git log -1', {
    maxBuffer: Infinity,
    cwd: repoPath
  }, function (error, stdout, stderr) {
    if (error) {
      throw error;
    }
    done(stdout);
  });
}
