/*
 * @Author: ChenYaJin
 * @Date: 2023-09-04 09:15:17
 * @LastEditors: ChenYaJin
 * @LastEditTime: 2023-09-04 15:14:48
 * @Description: options parse
 */
import { inquiryProcess } from './inquiry'
import { log } from './log'
import { commit } from './commit'
import { addAll } from './add'
import { resolvePatterns } from './validate'

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
const commitMessageByPrompt = () => {
  inquiryProcess().then(answer => {
    const { type, scope, subject, body, footer } = answer
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
  })
}

/**
 * confirm message by input
 */
const commitMessageByInput = (message) => {
  const matches = resolvePatterns(message)
  console.log('matches', matches)
}

export default parseOptions
