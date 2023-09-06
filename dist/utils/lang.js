"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _index = require("./index");
var _default = getLangs;
exports.default = _default;
function getLangs() {
  return {
    'en-US': {
      stereotypes: {
        feat: 'A new feature.',
        fix: 'A bug fix.',
        docs: 'Documentation only changes.',
        style: 'Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).',
        refactor: 'A code change that neither fixes a bug nor adds a feature.',
        test: 'Adding missing tests or correcting existing ones.',
        chore: 'Changes to the build process or auxiliary tools and libraries such as documentation generation.',
        // added
        perf: 'A code change that improves performance.',
        ci: 'Changes to your CI configuration files and scripts.',
        build: 'Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm).',
        temp: 'Temporary commit that won\'t be included in your CHANGELOG.'
      },
      descriptions: {
        example: _index.config.scopeRequired ? 'docs(README): add developer tips' : 'docs: update README to add developer tips',
        scope: [`${_index.config.scopeRequired ? 'Required' : 'Optional'}, can be anything specifying the scope of the commit change.`, 'For example $location, $browser, $compile, $rootScope, ngHref, ngClick, ngView, etc.', 'In App Development, scope can be a page, a module or a component.'],
        invalidScope: [_index.config.scopeRequired ? '`scope` required.' : '`scope` can be optional, but its parenthesis if exists cannot be empty.'],
        subject: ['Brief summary of the change in present tense. Not capitalized. No period at the end.'],
        invalidSubject: ['- don\'t capitalize first letter', '- no dot "." at the end`']
      },
      i18n: {
        invalidHeader: 'Invalid Git Commit Message',
        example: 'example',
        commitMessage: 'commit message',
        correctFormat: 'correct format',
        invalidLength: 'Invalid length',
        length: 'Length',
        invalidLengthTip: 'Commit message cannot be longer than {1} characters or shorter than {2} characters'
      }
    },
    'zh-CN': {
      stereotypes: {
        feat: '产品新功能：通常是能够让用户觉察到的变化，小到文案或样式修改',
        fix: '修复 bug',
        docs: '更新文档或注释',
        style: '代码格式调整，对逻辑无影响：比如为按照 eslint 或团队风格修改代码格式。注意不是 UI 变更',
        refactor: '重构：不影响现有功能或添加功能。比如文件、变量重命名，代码抽象为函数，消除魔法数字等',
        test: '单测相关变更',
        chore: '杂项：其他无法归类的变更，比如代码合并',
        // added
        perf: '性能提升变更',
        ci: '持续集成相关变更',
        build: '代码构建相关变更：比如修复部署时的构建问题、构建脚本 webpack 或 gulp 相关变更',
        temp: '临时代码：不计入 CHANGELOG，比如必须部署到某种环境才能测试的变更'
      },
      descriptions: {
        example: _index.config.scopeRequired ? 'docs(README): 添加开发者部分' : 'docs: 更新 README 添加开发者部分',
        scope: ['可选。变更范围（细粒度要合适，并在一个项目中保持一致）：比如页面名、模块名、或组件名'],
        invalidScope: [_index.config.scopeRequired ? '`scope` 必选' : '`scope` 可选，若有则必须加小括号'],
        subject: ['此次变更的简短描述，必须采用现在时态，如果是英语则首字母不能大写，句尾不加句号'],
        invalidSubject: ['首字母不能大写', '句尾不加句号']
      },
      i18n: {
        invalidHeader: 'Git 提交信息不规范',
        example: '示例',
        commitMessage: '提交信息',
        correctFormat: '正确格式',
        invalidLength: '提交信息长度不合法',
        length: '长度',
        invalidLengthTip: '提交信息长度不能大于 {1} 或小于 {2}'
      }
    }
  };
}