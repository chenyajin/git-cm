
import path from 'path'
import { readFileSync } from 'fs'
import chalk from 'chalk'

export {
  config,
  debug,
}

const localConfig = readLocalConfig()
const defaultConfig = readDefaultConfig()
const config = { ...defaultConfig, ...localConfig }

/**
 * Read local configuration file
 *  If the current directory does not have a configuration file, read the default file 
 * @returns {object}
 */
function readLocalConfig () {
  let filename = path.resolve(process.cwd(), 'gitcommitrc.json')
  let packageName = chalk.yellowBright('git-cm')
  let content = '{}'

  try {
    content = readFileSync(filename)
  } catch (error) {
    if (error.code === 'ENOENT') {
      /** pass, as gitcommitrc are optional */
      /** read the default file */
      const filename = path.resolve(__dirname, '../../gitcommitrc.json')
      content = readFileSync(filename);
    } else {
      /** pass, gitcommitrc ignored when invalid */
      /** It must be a bug so output the error to the user */
      console.error(`${packageName}: ${chalk.redBright('read gitcommitrc.json failed')}`, error)
    }
  }

  let configObject = {}

  try {
    configObject = JSON.parse(content)
  } catch (error) {
    /** pass, gitcommitrc ignored when invalid json */
    /** output the error to the user for self-checking */
    console.error(`${packageName}: ${chalk.redBright('gitcommitrc.json ignored because of invalid json')}`)
  }

  return configObject;
}

/**
 * Read the default configuration file 
 * @returns {object}
 */
function readDefaultConfig () {
  const defaultConfigName = localConfig && localConfig.lang === 'zh-CN' ? 'gitcommitrc-zh.json' : 'gitcommitrc.json'
  const filename = path.resolve(__dirname, `../../${defaultConfigName}`);
  let packageName = chalk.yellowBright('git-cm')
  let content = '{}';

  try {
    content = readFileSync(filename);
  } catch (error) {
    if (error.code === 'ENOENT') {
      /** pass, as gitcommitrc are optional */
    } else {
      /** pass, gitcommitrc ignored when invalid */
      /** It must be a bug so output the error to the user */
      console.error(`${packageName}: ${chalk.redBright('read gitcommitrc.json failed')}`, error);
    }
  }

  let configObject = {};

  try {
    configObject = JSON.parse(content);
  } catch (error) {
    /** pass, gitcommitrc ignored when invalid json */
    /** output the error to the user for self-checking */
    console.error(`${packageName}: ${chalk.redBright('gitcommitrc.json ignored because of invalid json')}`);
  }

  return configObject;
}

/**
 * Output debugging information.
 * @param  {any[]} args
 * @returns {void}
 */
function debug (...args) {
  console.info(chalk.greenBright('[DEBUG]'), ...args);
}

function getSubjectTipByType () {

}

