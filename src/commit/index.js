import { commitPrompt } from './message'
import { log } from './log'
import { commit } from './commit'

const parseOptions = async (options) => {
  commitPrompt().then(answer => {
    const { type, scope, subject, body, footer } = answer
    let message = scope ? type + '(' + scope + ')' : type
    message += `: ${subject}`
    const add = options.add || options.a
    commit(process.cwd(), add, message, {}, function (error) {
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



export default parseOptions