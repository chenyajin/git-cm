/*
 * @Author: ChenYaJin
 * @Date: 2023-09-04 09:47:39
 * @LastEditors: ChenYaJin
 * @LastEditTime: 2023-09-07 15:52:50
 * @Description: verify format of the commit message
 */
import {
  config,
  debug
} from '../utils/index'
import getLangs from '../utils/lang'
import chalk from 'chalk'

export {
  validateMessage,
  resolvePatterns,
  getMergedTypesObj
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
  const messageLength = message.length || 0

  // 取配置参数
  const mergedTypes = getMergedTypesObj()
  const types = Object.keys(mergedTypes)
  const maxLen = config.maxLen
  const minLen = config.minLen || 0
  const scopeRequired = config.scopeRequired
  const showInvalidHeader = true

  if (messageLength > maxLen || messageLength < minLen) {
    invalidLength = true
    isValid = false
  }

  const matches = resolvePatterns(message, types)

  if (!matches) {
    displayError(
      {
        invalidFormat: true,
        invalidType: true,
        invalidSubject: true,
        invalidLength: invalidLength
      },
      {
        mergedTypes,
        maxLen,
        minLen,
        message,
        showInvalidHeader,
        scopeRequired,
      }
    )
    return false
  }

  const { type, scope, subject = '' } = matches || {}

  const invalidType = !types.includes(type)
  const [invalidScope, reason] = isInvalidScope(scope, { scopeRequired })
  // Don't capitalize first letter; No dot (.) at the end
  const invalidSubject = !subject.length || isUpperCase(subject[0]) || subject.endsWith('.')

  isValid = !invalidLength && !invalidType && !invalidScope && !invalidSubject
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
        showInvalidHeader,
        scopeRequired,
      }
    )
  }

  return isValid
}

/** verify format of the message */
function resolvePatterns (message, types) {
  const PATTERN = /^(?:\s*)?(\w*)(\(([\w\$\.\*/-]*)\))?!?\: (.*)$/
  const matches = PATTERN.exec(message)

  if (matches) {
    const type = matches[1]
    const scope = matches[3]
    const subject = matches[4]

    return {
      type,
      scope,
      subject,
    }
  }

  if (types.includes(message)) {
    return {
      type: message
    }
  }

  return null
}

/** verify scope */
function isInvalidScope (scope, { scopeRequired }) {
  const trimScope = scope && scope.trim()

  if (scopeRequired) {
    if (!trimScope) return [true, 'SCOPE_REQUIRED']
  }

  if (typeof scope === 'string') {
    // scope can be optional, but not empty string
    // @example
    // "test: hello" OK
    // "test(): hello" FAILED
    if (trimScope === '') { return [true, 'SCOPE_EMPTY_STRING'] }
  }

  return [false];
}

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
    showInvalidHeader,
    scopeRequired,
  },
) {
  const decoratedType = addPeripherals('type', true)
  const scope = addPeripherals('scope', scopeRequired)
  const subject = addPeripherals('subject', true)

  const types = Object.keys(mergedTypes)
  const suggestedType = suggestType(type, types)
  const typeDescriptions = describeTypes(mergedTypes, suggestedType)

  const invalid = invalidLength || invalidFormat || invalidType || invalidScope || invalidSubject
  const langKeys = Object.keys(langs)
  const lang = langKeys.includes(config.lang) ? config.lang : 'en-US'
  const translated = langs[lang].i18n
  const { invalidHeader } = translated
  const header = !showInvalidHeader
    ? ''
    : chalk.redBright(`\n  ************* ${invalidHeader} **************`);

  const { scope: scopeDescriptions, subject: subjectDescriptions, example: exampleMessage } = langs[lang].descriptions
  const scopeDescription = scopeDescriptions.join('\n    ')
  const subjectDescription = subjectDescriptions.join('\n    ')
  const { example: labelExample, correctFormat, commitMessage } = translated

  const correctedExample = invalidType ? didYouMean(message, { types, example: exampleMessage }) : exampleMessage

  console.info(
    `${header}${`
  ${label(`${commitMessage}:`)}  ${chalk.redBright(message)}`}${generateInvalidLengthTips(message, invalidLength, maxLen, minLen, lang)}
  ${label(`${correctFormat}:`)} ${invalidType ? chalk.redBright(decoratedType) : chalk.greenBright(decoratedType)} ${invalidScope ? chalk.redBright(scope) : chalk.greenBright(scope)} ${invalidSubject ? chalk.redBright(subject) : chalk.greenBright(subject)}
  ${label(`${labelExample}:`)} ${chalk.greenBright(`${correctedExample}`)}
  
  ${invalidType ? chalk.redBright('type:') : chalk.yellowBright('type:')}
    ${typeDescriptions}

  ${invalidScope ? chalk.redBright('scope:') : chalk.yellowBright('scope:')}
     ${chalk.bold(scopeDescription)}

  ${invalidSubject ? chalk.redBright('subject:') : chalk.yellowBright('subject:')}
     ${chalk.bold(subjectDescription)}
  `,
  );
}


function getMergedTypesObj () {
  let types = {};
  (config.types || []).forEach(item => {
    types[item.value] = item.name
  })
  return types
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
    return `<${text}>`
  }

  return `(${text})`
}

/**
 * isUpperCase
 * @param {string} letter
 * @returns {boolean}
 */
function isUpperCase (letter) {
  return /^[A-Z]$/.test(letter)
}

function suggestType (type = '', types) {

  const suggestedType = types.find((t) => type.includes(t) || t.includes(type))

  return suggestedType || ''
}

function describeTypes (mergedTypes, suggestedType = '') {
  const types = Object.keys(mergedTypes)
  const maxTypeLength = [...types].sort((t1, t2) => t2.length - t1.length)[0].length

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
function describe ({
  index, type, description, maxTypeLength,
}) {
  const paddingBefore = index === 0 ? '' : nSpaces(4)
  const marginRight = nSpaces(maxTypeLength - type.length + 1)

  return `${paddingBefore}${chalk.yellow(type)}${marginRight}${chalk.bold(description)}`
}

/**
 * return a string of n spaces
 *
 * @param  {number}
 * @return {string}
 */
function nSpaces (n) {
  const space = ' ';

  return space.repeat(n);
}

/**
 * Style text like a label.
 * @param {string} text
 * @returns {string}
 */
function label (text) {
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
function generateInvalidLengthTips (message, invalid, maxLen, minLen, lang) {
  if (invalid) {
    const max = chalk.redBright(maxLen)
    const min = chalk.redBright(minLen)
    const { i18n } = langs[lang]
    const tips = `${chalk.redBright(i18n.length)} ${chalk.magenta(message.length || 0)}. ${chalk.bold.redBright(format(i18n.invalidLengthTip, max, min))}`
    return `\n  ${chalk.bold(i18n.invalidLength)}: ${tips}`
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
function format (text, ...args) {
  return text.replace(/\{(\d+)\}/g, (_, i) => chalk.magenta(args[i - 1]))
}

function didYouMean (message, { types, example }) {
  const patterns = resolvePatterns(message, types)

  if (!patterns || !patterns.type) {
    return example
  }

  const { type, scope, subject } = patterns;

  // Get the closest match
  const suggestedType = suggestType(type, types)

  if (!suggestedType) {
    return example
  }

  if (!subject) {
    return example
  }

  const TYPE_REGEXP = /^\w+(\(\w*\))?:/

  return message.replace(TYPE_REGEXP, (_, p1) => (p1 && p1 !== '()' ? `${suggestedType}${p1}:` : `${suggestedType}:`))
}