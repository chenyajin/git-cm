"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = void 0;
exports.debug = debug;
var _path = _interopRequireDefault(require("path"));
var _fs = require("fs");
var _chalk = _interopRequireDefault(require("chalk"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const localConfig = readLocalConfig();
const defaultConfig = readDefaultConfig();
const config = _objectSpread(_objectSpread({}, defaultConfig), localConfig);

/** Read local configuration file */
/** If the current directory does not have a configuration file, read the default file */
exports.config = config;
function readLocalConfig() {
  let filename = _path.default.resolve(process.cwd(), 'gitcommitrc.json');
  let packageName = _chalk.default.yellowBright('git-cm');
  let content = '{}';
  try {
    content = (0, _fs.readFileSync)(filename);
  } catch (error) {
    if (error.code === 'ENOENT') {
      /** pass, as gitcommitrc are optional */
      /** read the default file */
      const filename = _path.default.resolve(__dirname, '../../gitcommitrc.json');
      content = (0, _fs.readFileSync)(filename);
    } else {
      /** pass, gitcommitrc ignored when invalid */
      /** It must be a bug so output the error to the user */
      console.error(`${packageName}: ${_chalk.default.redBright('read gitcommitrc.json failed')}`, error);
    }
  }
  let configObject = {};
  try {
    configObject = JSON.parse(content);
  } catch (error) {
    /** pass, gitcommitrc ignored when invalid json */
    /** output the error to the user for self-checking */
    console.error(`${packageName}: ${_chalk.default.redBright('gitcommitrc.json ignored because of invalid json')}`);
  }
  return configObject;
}

/** read the default configuration file */
function readDefaultConfig() {
  const filename = _path.default.resolve(__dirname, '../../gitcommitrc.json');
  let packageName = _chalk.default.yellowBright('git-cm');
  let content = '{}';
  try {
    content = (0, _fs.readFileSync)(filename);
  } catch (error) {
    if (error.code === 'ENOENT') {
      /** pass, as gitcommitrc are optional */
    } else {
      /** pass, gitcommitrc ignored when invalid */
      /** It must be a bug so output the error to the user */
      console.error(`${packageName}: ${_chalk.default.redBright('read gitcommitrc.json failed')}`, error);
    }
  }
  let configObject = {};
  try {
    configObject = JSON.parse(content);
  } catch (error) {
    /** pass, gitcommitrc ignored when invalid json */
    /** output the error to the user for self-checking */
    console.error(`${packageName}: ${_chalk.default.redBright('gitcommitrc.json ignored because of invalid json')}`);
  }
  return configObject;
}

/**
 * Output debugging information.
 * @param  {any[]} args
 * @returns {void}
 */
function debug(...args) {
  console.info(_chalk.default.greenBright('[DEBUG]'), ...args);
}