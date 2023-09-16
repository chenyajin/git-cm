/*
 * @Author: ChenYaJin
 * @Date: 2023-09-04 09:15:17
 * @LastEditors: ChenYaJin
 * @LastEditTime: 2023-09-15 14:51:56
 * @Description: commit core
 */
import { execSync, spawn, spawnSync } from 'child_process';
import path from 'path';
import { writeFileSync, openSync, closeSync } from 'fs';
import dedent from 'dedent';
import { debug } from '../utils/index';

export { commit };

/**
 * Asynchronously git commit at a given path with a message
 * @param {string} repoPath 当前执行目录
 * @param {string} message 提交信息header(type、scope、subject)
 * @param {object} options
 * @param {function} done 回调函数
 */
function commit (repoPath, message, options, done) {
  commitCore(repoPath, message, options, done)
}

/**
 * shell of 'git commit -m'
 */
function commitCore (repoPath, message, options, done) {
  let called = false;
  if (!options.hookMode) {
    let args = ['commit', '-m', dedent(message)];
    let child = spawn('git', args);

    child.stdout.on('data', (data) => {
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
            `)
        }
        // done(Object.assign(new Error(`git exited with error code ${code}`), { code, signal }));
      } else {
        done(null);
      }
    });
  } else {
    const gitDirPath = execSync(
      'git rev-parse --absolute-git-dir',
      { encoding: 'utf8' },
    ).trim();
    const commitFilePath = path.join(gitDirPath, 'COMMIT_EDITMSG');
    try {
      const fd = openSync(commitFilePath, 'w');
      try {
        writeFileSync(fd, dedent(message));
        done(null);
      } catch (e) {
        done(e);
      } finally {
        closeSync(fd);
      }
    } catch (e) {
      // windows doesn't allow opening existing hidden files
      // in 'w' mode... but it does let you do 'r+'!
      try {
        const fd = openSync(commitFilePath, 'r+');
        try {
          writeFileSync(fd, dedent(message));
          done(null);
        } catch (e) {
          done(e);
        } finally {
          closeSync(fd);
        }
      } catch (e) {
        done(e);
      }
    }
  }
}
