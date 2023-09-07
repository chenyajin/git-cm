/*
 * @Author: ChenYaJin
 * @Date: 2023-09-04 09:15:17
 * @LastEditors: ChenYaJin
 * @LastEditTime: 2023-09-07 15:09:31
 * @Description: options parse
 */
import { inquiryProcess } from './inquiry'
import { log } from './log'
import { commit } from './commit'
import { addAll } from './add'
import { validateMessage, resolvePatterns, getMergedTypesObj } from './validate'

/**
 * git-cm -a
 * git-cm -am
 * git-cm -am 'feat: 11'
 */
const parseOptions = async (options) => {
  const add = options.a || options.add
  const message = options.m || options.message
  await addAll(add)
  if (message && typeof message === 'string') {
    commitMessageByInput(message)
  } else {
    commitMessageByPrompt()
  }
}

/**
 * confirm message by prompt
 */
function commitMessageByPrompt () {
  inquiryProcess().then(answer => {
    const { type, scope, subject, body, footer } = answer
    commitByMessage(type, scope, subject)
  })
}

/**
 * confirm message by input
 */
function commitMessageByInput (message) {
  const isValid = validateMessage(message)
  if (isValid) {
    const { type, scope, subject } = resolvePatterns(message, [])
    commitByMessage(type, scope, subject)
  }
}

function commitByMessage (type, scope, subject) {
  let message = scope ? type + '(' + scope + ')' : type
  message += `: ${subject}`
  commit(process.cwd(), message, {}, function (error) {
    if (error) {
      console.log(error)
      return
    }
    log(process.cwd(), function (logOutput) {
      console.log(logOutput)
    });
  })
}

export default parseOptions
