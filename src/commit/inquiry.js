/*
 * @Author: ChenYaJin
 * @Date: 2023-09-04 09:15:17
 * @LastEditors: ChenYaJin
 * @LastEditTime: 2023-09-04 11:59:47
 * @Description: inquiry process
 */
import inquirer from 'inquirer';
import { config } from '../utils'

export function inquiryProcess () {
  return new Promise((resolve, reject) => {
    inquirer.prompt([
      {
        type: 'list',
        name: 'type',
        message: config.messages.type,
        choices: config.types,
      },
      {
        type: 'input',
        name: 'scope',
        message: config.messages.scope,
        when: !config.skipQuestions.includes('scope'),
        validate: function (val) {
          if (config.requiredAnswers.includes('scope') && !val.trim()) {
            return "Cannot be empty";
          }
          return true;
        }
      },
      {
        type: 'input',
        name: 'subject',
        message: config.messages.subject,
        validate: function (val) {
          if (config.requiredAnswers.includes('subject') && !val.trim()) {
            return "Cannot be empty";
          }
          if (config.subjectLimit && val.length > config.subjectLimit) {
            return `No more than ${config.subjectLimit} words`
          }
          return true;
        },
      },
      {
        type: 'input',
        name: 'body',
        message: config.messages.body,
        when: !config.skipQuestions.includes('body')
      },

      {
        type: 'input',
        name: 'footer',
        message: config.messages.footer,
        when: !config.skipQuestions.includes('footer')
      },
    ]).then(answers => {
      resolve(answers)
    }).catch(error => {
      reject(error)
    })
  })

}