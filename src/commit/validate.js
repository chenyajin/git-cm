/*
 * @Author: ChenYaJin
 * @Date: 2023-09-04 09:47:39
 * @LastEditors: ChenYaJin
 * @LastEditTime: 2023-09-06 18:18:51
 * @Description: verify format of the commit message
 */
import {
  YELLOW,
  GRAY,
  RED,
  GREEN,
  EOS,
  BOLD,
  config,
  debug
} from '../utils/index'
import getLangs from '../utils/lang'
import chalk from 'chalk'

export {
  validateMessage,
  resolvePatterns
}

const langs = getLangs()

/**
 * validate git message
 *
 * @param {string} message
 * @returns {boolean}
 */

function validateMessage (message) {
  let isValid = true
  let invalidLength = false

  // 取配置参数
  const mergedTypes = getMergedTypesObj()
  const maxLen = config.maxLen
  const minLen = config.minLen || 0
  const scopeRequired = config.scopeRequired
  const showInvalidHeader = true
  const example = 'docs: update README'

  if (message.length > maxLen || message.length < minLen) {
    invalidLength = true
    isValid = false
  }

  const matches = resolvePatterns(message)

  if (!matches) {
    displayError(
      {
        invalidFormat: true,
        invalidType: true
      },
      {
        mergedTypes,
        maxLen,
        minLen,
        message,
        example,
        showInvalidHeader,
        // scopeDescriptions,
        // invalidScopeDescriptions: invalidScopeDescriptions,
        // subjectDescriptions,
        // postSubjectDescriptions,
        // invalidSubjectDescriptions,
        // lang,
        scopeRequired,
      }
    )
    return false
  }

  const { type, scope, subject } =  matches || {}
  debug(`type: ${type}, scope: ${scope}, subject: ${subject}`);

  const types = Object.keys(mergedTypes)
  const invalidType = !types.includes(type)
  const [invalidScope, reason] = isInvalidScope(scope, { scopeRequired })

  // Don't capitalize first letter; No dot (.) at the end
  const invalidSubject = isUpperCase(subject[0]) || subject.endsWith('.');

  if (invalidLength || invalidType || invalidScope || invalidSubject) {
    displayError(
      {
        invalidLength, type, invalidType, invalidScope, invalidSubject,
      },
      {
        mergedTypes,
        maxLen,
        minLen,
        message,
        example,
        showInvalidHeader,
        // scopeDescriptions,
        // invalidScopeDescriptions: invalidScopeDescriptions,
        // subjectDescriptions,
        // postSubjectDescriptions,
        // invalidSubjectDescriptions,
        // lang,
        scopeRequired,
      }
    )
  }

  return isValid
}

/** verify format of the message */
function resolvePatterns (message) {
  const PATTERN = /^(?:\s*)?(\w*)(\(([\w\$\.\*/-]*)\))?\: (.*)$/;
  const matches = PATTERN.exec(message);
  debug(matches)

  if (matches) {
    const type = matches[1];
    const scope = matches[3];
    const subject = matches[4];

    return {
      type,
      scope,
      subject,
    };
  }

  return null;
}

/** verify scope */
function isInvalidScope (scope, { scopeRequired }) {
  const trimScope = scope && scope.trim();

  if (scopeRequired) {
    if (!trimScope) return [true, 'SCOPE_REQUIRED'];
  }

  if (typeof scope === 'string') {
    // scope can be optional, but not empty string
    // @example
    // "test: hello" OK
    // "test(): hello" FAILED
    if (trimScope === '') { return [true, 'SCOPE_EMPTY_STRING']; }
  }

  return [false];
}

// https://github.com/legend80s/git-commit-msg-linter/blob/master/packages/commit-msg-linter/commit-msg-linter.js#L479
function displayError (
  {
    invalidLength = false,
    invalidFormat = false,
    type,
    invalidType = false,
    invalidScope = false,
    invalidSubject = false,
  } = {},
  {
    mergedTypes,
    maxLen,
    minLen,
    message,
    example,
    showInvalidHeader,

    scopeDescriptions = [],
    invalidScopeDescriptions = [],
    subjectDescriptions = [],
    postSubjectDescriptions = [],
    invalidSubjectDescriptions = [],

    lang = 'zh-CN',
    scopeRequired,
  },
) {
  const decoratedType = addPeripherals('type', true);
  const scope = addPeripherals('scope', scopeRequired);
  const subject = addPeripherals('subject', true);

  const types = Object.keys(mergedTypes);
  const suggestedType = suggestType(type, types);
  const typeDescriptions = describeTypes(mergedTypes, suggestedType);

  const invalid = invalidLength || invalidFormat || invalidType || invalidScope || invalidSubject;
  const translated = langs[lang].i18n;
  const { invalidHeader } = translated;
  const header = !showInvalidHeader
    ? ''
    : chalk.yellow(`\n  ************* ${invalidHeader} **************`);

  const scopeDescription = scopeDescriptions.join('\n    ');
  const invalidScopeDescription = invalidScopeDescriptions.join('\n    ');
  const defaultInvalidScopeDescription = `scope can be ${emphasis('optional')}${RED}, but its parenthesis if exists cannot be empty.`;

  const subjectDescription = subjectDescriptions.join('\n    ');
  let postSubjectDescription = postSubjectDescriptions.join('\n    ');
  postSubjectDescription = postSubjectDescription ? `\n\n    ${italic(postSubjectDescription)}` : '';

  const invalidSubjectDescription = invalidSubjectDescriptions.join('\n    ');

  const { example: labelExample, correctFormat, commitMessage } = translated;

  const correctedExample = example;

  console.info(
    `${header}${invalid ? `
  ${label(`${commitMessage}:`)}  ${chalk.redBright(message)}` : ''}${generateInvalidLengthTips(message, invalidLength, maxLen, minLen, lang)}
  ${label(`${correctFormat}:`)} ${chalk.greenBright(`${decoratedType}${scope}: ${subject}`)}
  ${label(`${labelExample}:`)} ${chalk.greenBright(`${correctedExample}`)}
  
  ${chalk.yellow('type:')}
    ${typeDescriptions}
  `,
  );
}


function getMergedTypesObj() {
  let types = {};
    (config.types || []).forEach(item => {
      types[item.value] = item.name
    })
  return types
}


// ${invalidType ? RED : YELLOW}type:
// ${typeDescriptions}

// ${invalidScope ? RED : YELLOW}scope:
// ${GRAY}${scopeDescription}${invalidScope ? `${RED}
// ${invalidScopeDescription || defaultInvalidScopeDescription}` : ''}

// ${invalidSubject ? RED : YELLOW}subject:
// ${GRAY}${subjectDescription}${postSubjectDescription}${invalidSubject ? `${RED}
// ${invalidSubjectDescription}` : ''}


/**
 * Decorate the part of pattern.
 *
 * @param {string} text Text to decorate
 * @param {boolean} invalid Whether the part is invalid
 * @param {boolean} required For example `scope` is optional
 *
 * @returns {string}
 */
function decorate (text, invalid, required = true) {
  if (invalid) {
    return `${RED}${addPeripherals(underline(text) + RED, required)}`;
  }

  return `${GREEN}${addPeripherals(text, required)}`;
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
function addPeripherals (text, required = true) {
  if (required) {
    return `<${text}>`;
  }

  return `(${text})`;
}

/**
 * Make text underlined.
 * @param {string} text
 * @returns {string}
 */
function underline (text) {
  const UNDERLINED = '\x1b[4m';

  return `${UNDERLINED}${text}${EOS}`;
}

/**
 * isUpperCase
 * @param {string} letter
 * @returns {boolean}
 */
function isUpperCase (letter) {
  return /^[A-Z]$/.test(letter);
}

function suggestType (type = '', types) {

  const suggestedType = types.find((t) => type.includes(t) || t.includes(type));

  return suggestedType || '';
}

function describeTypes (mergedTypes, suggestedType = '') {
  const types = Object.keys(mergedTypes);
  const maxTypeLength = [...types].sort((t1, t2) => t2.length - t1.length)[0].length;

  return types
    .map((type, index) => {
      const description = mergedTypes[type];

      return describe({
        index, type, suggestedType, description, maxTypeLength
      });
    })
    .join('\n');
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
  index, type, description, maxTypeLength,
}) {
  const typeColor = YELLOW
  const paddingBefore = index === 0 ? '' : nSpaces(4);
  const marginRight = nSpaces(maxTypeLength - type.length + 1);

  return `${paddingBefore}${chalk.yellow(type)}${marginRight}${chalk.bold(description)}`;
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
 * Put emphasis on text.
 * @param {string} text
 * @returns {string}
 */
function emphasis(text) {
  const ITALIC = '\x1b[3m';
  const UNDERLINED = '\x1b[4m';

  return `${ITALIC}${UNDERLINED}${text}${EOS}`;
}

/**
 * Style text like a label.
 * @param {string} text
 * @returns {string}
 */
function label(text) {
  return chalk.bold(text);
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
    const max = `${BOLD}${maxLen}${EOS}${RED}`;
    const min = `${BOLD}${minLen}${EOS}${RED}`;
    // eslint-disable-next-line no-shadow
    const { i18n } = langs[lang];
    const tips = `${RED}${i18n.length} ${BOLD}${message.length}${EOS}${RED}. ${format(i18n.invalidLengthTip, max, min)}${EOS}`;
    return `\n  ${BOLD}${i18n.invalidLength}${EOS}: ${tips}`;
  }

  return '';
}