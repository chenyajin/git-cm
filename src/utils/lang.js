
import { config } from './index'

export default getLangs

function getLangs () {
  return {
    'en-US': {
      descriptions: {
        example: config.scopeRequired
          ? 'docs(README): add developer tips'
          : 'docs: update README to add developer tips',

        scope: [
          `${config.scopeRequired ? 'Required'
            : 'Optional'}, can be anything specifying the scope of the commit change.`,
          'In App Development, scope can be a page, a module or a component.',
        ],
        invalidScope: [
          config.scopeRequired ? '`scope` required.'
            : '`scope` can be optional, but its parenthesis if exists cannot be empty.',
        ],
        subject: [
          'Brief summary of the change in present tense. Not capitalized. No period at the end.',
        ],
        invalidSubject: [
          '- don\'t capitalize first letter',
          '- no dot "." at the end`',
        ],
      },
      i18n: {
        invalidHeader: 'Invalid Git Commit Message',
        example: 'example',
        commitMessage: 'commit message',
        correctFormat: 'correct format',
        invalidLength: 'Invalid length',
        length: 'Length',
        invalidLengthTip: 'Commit message cannot be longer than {1} characters or shorter than {2} characters',
      },
    },

    'zh-CN': {
      descriptions: {
        example: config.scopeRequired
          ? 'docs(README): 添加开发者部分'
          : 'docs: 更新 README 添加开发者部分',

        scope: [
          '可选。变更范围（细粒度要合适，并在一个项目中保持一致）：比如页面名、模块名、或组件名',
        ],
        invalidScope: [
          config.scopeRequired ? '`scope` 必选'
            : '`scope` 可选，若有则必须加小括号',
        ],
        subject: [
          '此次变更的简短描述，必须采用现在时态，如果是英语则首字母不能大写，句尾不加句号',
        ],
        invalidSubject: [
          '首字母不能大写',
          '句尾不加句号',
        ],
      },
      i18n: {
        invalidHeader: 'Git 提交信息不规范',
        example: '示例',
        commitMessage: '提交信息',
        correctFormat: '正确格式',
        invalidLength: '提交信息长度不合法',
        length: '长度',
        invalidLengthTip: '提交信息长度不能大于 {1} 或小于 {2}',
      },
    },

  };
}