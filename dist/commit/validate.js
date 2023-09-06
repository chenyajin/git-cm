"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvePatterns = resolvePatterns;
exports.validateMessage = validateMessage;
var _index = require("../utils/index");
var _lang = _interopRequireDefault(require("../utils/lang"));
var _chalk = _interopRequireDefault(require("chalk"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @Author: ChenYaJin
 * @Date: 2023-09-04 09:47:39
 * @LastEditors: ChenYaJin
 * @LastEditTime: 2023-09-06 18:18:51
 * @Description: verify format of the commit message
 */

const langs = (0, _lang.default)();

/**
 * validate git message
 *
 * @param {string} message
 * @returns {boolean}
 */

function validateMessage(message) {
  let isValid = true;
  let invalidLength = false;

  // 取配置参数
  const mergedTypes = getMergedTypesObj();
  const maxLen = _index.config.maxLen;
  const minLen = _index.config.minLen || 0;
  const scopeRequired = _index.config.scopeRequired;
  const showInvalidHeader = true;
  if (message.length > maxLen || message.length < minLen) {
    invalidLength = true;
    isValid = false;
  }
  const matches = resolvePatterns(message);
  if (!matches) {
    displayError({
      invalidFormat: true,
      invalidType: true,
      invalidLength: true
    }, {
      mergedTypes,
      maxLen,
      minLen,
      message,
      showInvalidHeader,
      scopeRequired
    });
    return false;
  }
  const {
    type,
    scope,
    subject
  } = matches || {};
  (0, _index.debug)(`type: ${type}, scope: ${scope}, subject: ${subject}`);
  const types = Object.keys(mergedTypes);
  const invalidType = !types.includes(type);
  const [invalidScope, reason] = isInvalidScope(scope, {
    scopeRequired
  });
  // Don't capitalize first letter; No dot (.) at the end
  const invalidSubject = isUpperCase(subject[0]) || subject.endsWith('.');
  isValid = !invalidLength && !invalidType && !invalidScope && !invalidSubject;
  if (invalidLength || invalidType || invalidScope || invalidSubject) {
    displayError({
      invalidLength,
      type,
      invalidType,
      invalidScope,
      invalidSubject
    }, {
      mergedTypes,
      maxLen,
      minLen,
      message,
      showInvalidHeader,
      scopeRequired
    });
  }
  return isValid;
}

/** verify format of the message */
function resolvePatterns(message) {
  const PATTERN = /^(?:\s*)?(\w*)(\(([\w\$\.\*/-]*)\))?\: (.*)$/;
  const matches = PATTERN.exec(message);
  if (matches) {
    const type = matches[1];
    const scope = matches[3];
    const subject = matches[4];
    return {
      type,
      scope,
      subject
    };
  }
  return null;
}

/** verify scope */
function isInvalidScope(scope, {
  scopeRequired
}) {
  const trimScope = scope && scope.trim();
  if (scopeRequired) {
    if (!trimScope) return [true, 'SCOPE_REQUIRED'];
  }
  if (typeof scope === 'string') {
    // scope can be optional, but not empty string
    // @example
    // "test: hello" OK
    // "test(): hello" FAILED
    if (trimScope === '') {
      return [true, 'SCOPE_EMPTY_STRING'];
    }
  }
  return [false];
}
function displayError({
  invalidLength = false,
  invalidFormat = false,
  type,
  invalidType = false,
  invalidScope = false,
  invalidSubject = false
} = {}, {
  mergedTypes,
  maxLen,
  minLen,
  message,
  showInvalidHeader,
  scopeRequired
}) {
  const decoratedType = addPeripherals('type', true);
  const scope = addPeripherals('scope', scopeRequired);
  const subject = addPeripherals('subject', true);
  const types = Object.keys(mergedTypes);
  const suggestedType = suggestType(type, types);
  const typeDescriptions = describeTypes(mergedTypes, suggestedType);
  const invalid = invalidLength || invalidFormat || invalidType || invalidScope || invalidSubject;
  const langKeys = Object.keys(langs);
  const lang = langKeys.includes(_index.config.lang) ? _index.config.lang : 'en-US';
  const translated = langs[lang].i18n;
  const {
    invalidHeader
  } = translated;
  const header = !showInvalidHeader ? '' : _chalk.default.redBright(`\n  ************* ${invalidHeader} **************`);
  const {
    scope: scopeDescriptions,
    subject: subjectDescriptions,
    example: exampleMessage
  } = langs[lang].descriptions;
  const scopeDescription = scopeDescriptions.join('\n    ');
  const subjectDescription = subjectDescriptions.join('\n    ');
  const {
    example: labelExample,
    correctFormat,
    commitMessage
  } = translated;
  const correctedExample = invalidType ? didYouMean(message, {
    types,
    example: exampleMessage
  }) : exampleMessage;
  console.info(`${header}${`
  ${label(`${commitMessage}:`)}  ${_chalk.default.redBright(message)}`}${generateInvalidLengthTips(message, invalidLength, maxLen, minLen, lang)}
  ${label(`${correctFormat}:`)} ${_chalk.default.greenBright(`${decoratedType}${scope}: ${subject}`)}
  ${label(`${labelExample}:`)} ${_chalk.default.greenBright(`${correctedExample}`)}
  
  ${invalidType ? _chalk.default.redBright('type:') : _chalk.default.yellowBright('type:')}
    ${typeDescriptions}

  ${invalidScope ? _chalk.default.redBright('scope:') : _chalk.default.yellowBright('scope:')}
     ${_chalk.default.bold(scopeDescription)}

  ${invalidSubject ? _chalk.default.redBright('subject:') : _chalk.default.yellowBright('subject:')}
     ${_chalk.default.bold(subjectDescription)}
  `);
}
function getMergedTypesObj() {
  let types = {};
  (_index.config.types || []).forEach(item => {
    types[item.value] = item.name;
  });
  return types;
}

/**
 * Add peripherals.
 *
 * @example
 * addPeripherals('type')
 * // => "<type>"
 * addPeripherals('scope', false)
 * // => "(scope)"
 *
 * @param {string} text
 * @param {boolean} required
 *
 * @returns {string}
 */
function addPeripherals(text, required = true) {
  if (required) {
    return `<${text}>`;
  }
  return `(${text})`;
}

/**
 * isUpperCase
 * @param {string} letter
 * @returns {boolean}
 */
function isUpperCase(letter) {
  return /^[A-Z]$/.test(letter);
}
function suggestType(type = '', types) {
  const suggestedType = types.find(t => type.includes(t) || t.includes(type));
  return suggestedType || '';
}
function describeTypes(mergedTypes, suggestedType = '') {
  const types = Object.keys(mergedTypes);
  const maxTypeLength = [...types].sort((t1, t2) => t2.length - t1.length)[0].length;
  return types.map((type, index) => {
    const description = mergedTypes[type];
    return describe({
      index,
      type,
      suggestedType,
      description,
      maxTypeLength
    });
  }).join('\n');
}

/**
 * generate a type description
 *
 * @param {number} options.index type index
 * @param {string} options.type type name
 * @param {string} options.description type description
 * @param {number} options.maxTypeLength max type length
 *
 * @returns {string}
 */
function describe({
  index,
  type,
  description,
  maxTypeLength
}) {
  const paddingBefore = index === 0 ? '' : nSpaces(4);
  const marginRight = nSpaces(maxTypeLength - type.length + 1);
  return `${paddingBefore}${_chalk.default.yellow(type)}${marginRight}${_chalk.default.bold(description)}`;
}

/**
 * return a string of n spaces
 *
 * @param  {number}
 * @return {string}
 */
function nSpaces(n) {
  const space = ' ';
  return space.repeat(n);
}

/**
 * Style text like a label.
 * @param {string} text
 * @returns {string}
 */
function label(text) {
  return _chalk.default.bold(text);
}

/**
 * Generate invalid length tips.
 *
 * @param {string} message commit message
 * @param {boolean} invalid
 * @param {number} maxLen
 * @param {number} minLen
 * @param {string} lang
 * @returns {string}
 */
function generateInvalidLengthTips(message, invalid, maxLen, minLen, lang) {
  if (invalid) {
    const max = _chalk.default.redBright(maxLen);
    const min = _chalk.default.redBright(minLen);
    const {
      i18n
    } = langs[lang];
    const tips = `${_chalk.default.redBright(i18n.length)} ${_chalk.default.magenta(message.length)}. ${_chalk.default.bold.redBright(format(i18n.invalidLengthTip, max, min))}`;
    return `\n  ${_chalk.default.bold(i18n.invalidLength)}: ${tips}`;
  }
  return '';
}

/**
 * Replaces numeric arguments inside curly brackets with their corresponding values.
 *
 * @param {string} text A text with arguments between curly brackets
 * @param  {any[]} args Values to replace the arguments
 * @returns
 */
function format(text, ...args) {
  return text.replace(/\{(\d+)\}/g, (_, i) => _chalk.default.magenta(args[i - 1]));
}
function didYouMean(message, {
  types,
  example
}) {
  const patterns = resolvePatterns(message);
  if (!patterns && !patterns.type) {
    return example;
  }
  const {
    type
  } = patterns;

  // Get the closest match
  const suggestedType = suggestType(type, types);
  if (!suggestedType) {
    return example;
  }
  const TYPE_REGEXP = /^\w+(\(\w*\))?:/;
  return message.replace(TYPE_REGEXP, (_, p1) => p1 && p1 !== '()' ? `${suggestedType}${p1}:` : `${suggestedType}:`);
}