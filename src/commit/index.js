import { commitPrompt } from './message'
import { log } from './log'
import { commit } from './commit'
import { expect } from 'chai';

const parseOptions = async (options) => {
  commitPrompt().then(answer => {
    const { type, scope, subject, body, footer } = answer
    let message = scope ? type + '(' + scope + ')' : type
    message += `: ${subject}`
    const add = options.add || options.a
    commit(process.cwd(), add, message, { disableAppendPaths: true, quiet: true, emitData: true }, function () {
      log(process.cwd(), function (logOutput) {
        console.log(logOutput)
        // let dummyCommitMessage = `sip sip sippin on some sizzurp`;
        // expect(logOutput).to.have.string(dummyCommitMessage);
        // done();
      });
    })
  })
  
}



export default parseOptions