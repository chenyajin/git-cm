// en

```json
{
  "types": [
    {
      "value": "feat",
      "name": "A new feature "
    },
    {
      "value": "fix",
      "name": "A bug fix "
    },
    {
      "value": "docs",
      "name": "Documentation only changes "
    },
    {
      "value": "style",
      "name": "Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc) "
    },
    {
      "value": "refactor",
      "name": "A code change that neither fixes a bug nor adds a feature "
    },
    {
      "value": "perf",
      "name": "A code change that improves performance"
    },
    {
      "value": "test",
      "name": "Adding missing tests or correcting existing tests"
    },
    {
      "value": "ci",
      "name": "Changes to your CI configuration files and scripts"
    },
    {
      "value": "build",
      "name": "Changes that affect the build system or external dependencies"
    },
    {
      "value": "chore",
      "name": "Changes to the build process or auxiliary tools and libraries such as documentation generation."
    }
  ],
  "messages": {
    "type": "(type) Select the type of change that you're committing: (Use arrow keys)",
    "scope": "(scope) Write a brief description of the scope of impact:",
    "subject": "(subject) Write a short, imperative tense description of the change:",
    "body": "(body) Provide a longer description of change, Wrap with :\n",
    "footer": "(footer) List any breaking changes:"
  },
  "maxLen": 100,
  "minLen": 0,
  "subjectLimit": 50,
  "skipQuestions": ["body", "footer"],
  "scopeRequired": false,
  "lang": "en-US"
}
```

// zh

```json
{
  "types": [
    {
      "value": "feat",
      "name": "产品新功能：通常是能够让用户觉察到的变化，小到文案或样式修改"
    },
    {
      "value": "fix",
      "name": "修复 bug"
    },
    {
      "value": "docs",
      "name": "更新文档或注释"
    },
    {
      "value": "style",
      "name": "代码格式调整，对逻辑无影响：比如为按照 eslint 或团队风格修改代码格式。注意不是 UI 变更"
    },
    {
      "value": "refactor",
      "name": "重构：不影响现有功能或添加功能。比如文件、变量重命名，代码抽象为函数，消除魔法数字等"
    },
    {
      "value": "perf",
      "name": "性能提升变更"
    },
    {
      "value": "test",
      "name": "单测相关变更"
    },
    {
      "value": "ci",
      "name": "持续集成相关变更"
    },
    {
      "value": "build",
      "name": "代码构建相关变更：比如修复部署时的构建问题、构建脚本 webpack 或 gulp 相关变更"
    },
    {
      "value": "chore",
      "name": "杂项：其他无法归类的变更，比如代码合并"
    }
  ],
  "messages": {
    "type": "(type) 选择您正在提交的更改类型：（使用箭头键）",
    "scope": "(scope) 简要描述影响范围：",
    "subject": "(subject) 写一个简短的、未完成时态的变化描述:",
    "body": "(body) 提供更详细的变更说明， 换行用 :\n",
    "footer": "(footer) 不兼容变更和Issue关闭的信息:"
  },
  "maxLen": 100,
  "minLen": 0,
  "subjectLimit": 50,
  "skipQuestions": ["body", "footer"],
  "scopeRequired": false,
  "lang": "en-US"
}
```
