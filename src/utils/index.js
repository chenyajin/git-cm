
import path from 'path'
import { readFileSync } from 'fs'

const colorSupported = false;
const YELLOW = colorSupported ? '\x1b[1;33m' : '';
const GRAY = colorSupported ? '\x1b[0;37m' : '';
const RED = colorSupported ? '\x1b[0;31m' : '';
const GREEN = colorSupported ? '\x1b[0;32m' : '';

export {
  config
}

const localConfig = readLocalConfig()
const defaultConfig = readDefaultConfig()
const config = { ...defaultConfig, ...localConfig }

/** Read local configuration file */
/** If the current directory does not have a configuration file, read the default file */
function readLocalConfig () {
  let filename = path.resolve(process.cwd(), 'gitcommitrc-local.json');
  let packageName = `${YELLOW}git-cm`;
  let content = '{}';

  try {
    content = readFileSync(filename);
  } catch (error) {
    if (error.code === 'ENOENT') {
      /** pass, as gitcommitrc are optional */
      /** read the default file */
      const filename = path.resolve(__dirname, '../../gitcommitrc.json');
      content = readFileSync(filename);
    } else {
      /** pass, gitcommitrc ignored when invalid */
      /** It must be a bug so output the error to the user */
      console.error(`${packageName}: ${RED}read gitcommitrc.json failed`, error);
    }
  }

  let configObject = {};

  try {
    configObject = JSON.parse(content);
  } catch (error) {
    /** pass, gitcommitrc ignored when invalid json */
    /** output the error to the user for self-checking */
    console.error(`${packageName}: ${RED}gitcommitrc.json ignored because of invalid json`);
  }

  return configObject;
}

/** read the default configuration file */
function readDefaultConfig () {
  const filename = path.resolve(__dirname, '../../gitcommitrc.json');
  let packageName = `${YELLOW}git-cm`;
  let content = '{}';

  try {
    content = readFileSync(filename);
  } catch (error) {
    if (error.code === 'ENOENT') {
      /** pass, as gitcommitrc are optional */
    } else {
      /** pass, gitcommitrc ignored when invalid */
      /** It must be a bug so output the error to the user */
      console.error(`${packageName}: ${RED}read gitcommitrc.json failed`, error);
    }
  }

  let configObject = {};

  try {
    configObject = JSON.parse(content);
  } catch (error) {
    /** pass, gitcommitrc ignored when invalid json */
    /** output the error to the user for self-checking */
    console.error(`${packageName}: ${RED}gitcommitrc.json ignored because of invalid json`);
  }

  return configObject;
}