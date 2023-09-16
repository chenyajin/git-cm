
<h1 align="center">git-cm 👋</h1>

<p  align="center">
  <a href="https://www.npmjs.com/package/git-cm">
    <img src="https://img.shields.io/npm/v/git-cm.svg" alt="npm version" />
  </a>
  <a href="https://www.npmjs.com/package/git-cm">
    <img src="https://img.shields.io/npm/dm/git-cm.svg" alt="npm downloads" />
  </a>
  <img src="https://img.shields.io/badge/node-%3E%3D%2016.0.0-blue.svg" alt="prerequisite node version" />
</p>

- [English](https://github.com/chenyajin/git-cm/blob/main/README-en.md)
- [简体中文](https://github.com/chenyajin/git-cm/blob/main/README.md)

> 一款 轻量级、0 配置，也可支持定制化的 git commit message 命令行工具
>
> ✨ 支持校验格式：允许手动输入提交消息，然后对其进行验证，以确保符合 [AngularJS 提交规范](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines)。
>
> ✨ 询问式交互：允许通过询问式交互选择 commit 信息。
>
> ✨ 定制化：允许在项目根目录中添加配置文件 去重写/覆盖默认配置。

![git-cm-verify-demo](https://raw.githubusercontent.com/chenyajin/git-cm/dev/assets/messsage_verify_en.png)

![git-cm-select-demo](https://raw.githubusercontent.com/chenyajin/git-cm/dev/assets/select_success_en.png)

## 安装命令行工具

安装很简单，只需运行以下命令 (如果您看到“EACCES”错误，请阅读 [fixing npm permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions) 查询帮助):

```sh
npm install -g git-cm
```

## 开始使用命令行

提交时只需使用 git-cm 或 cm 去代替 git commit 即可。

支持一下命令行：

```sh
git-cm
git-cm -a
git-cm -m 'type(scope): subject'
git-cm -am 'type(scope): subject'
```

或者 运行脚本的方式：

```json
  ...
  "scripts": {
    "commit": "git-cm"
  }
```

---

当使用 git-cm 时，在没有携带 commit 消息的情况下，系统会发起询问式选择，让用户自主选择提交的 <type> (scope)<subject>, 选择的内容配置按照默认的配置引导，如果当前项目根目录下有配置 gitcommitrc.json，则按照配置的规则来引导。

当使用 git-cm -m 'type(scope): subject' 时，在携带 commit 消息的情况下，系统将去验证这条 commit 信息是否符合 AngularJS 提交规范，如果不符合，则给出对应提示，如果符合，则继续提交。

您可以在[gitcommitrc.json](https://github.com/chenyajin/git-cm/blob/main/gitcommitrc.json)中查看默认配置文件的格式

当然，您也可以在项目的根目录中创建下面的“gitcommitrc.json”文件，以覆盖默认文件。

---

## 推荐的 commit 信息格式

```
<type>(<scope>): <short summary>
  │       │             │
  │       │             └─⫸ Summary in present tense. Not capitalized. No period at the end.
  │       │
  │       └─⫸ Commit Scope: Optional, can be anything specifying the scope of the commit change.
  |                          In App Development, scope can be a page, a module or a component.
  │
  └─⫸ Commit Type: feat|fix|docs|style|refactor|test|chore|perf|ci|build|chore
```

\<type> 和 \<subject> 字段是强制性必填的，scope 是选填的。

❌ 不推荐的:

> update README to add how to install

✅ 推荐的:

> docs: update README to add how to install

✅ 推荐的: (带有 scope 的):

> docs(README): update README to add how to install

## 零配置

安装之后，就可以使用，所以配置文件不是必须的！如果有定制的需求，也可以支持 在项目根目录下添加 gitcommitrc.json 文件，去 重写/覆盖 默认配置。

默认配置 参数如下：

> `types`: {Array}, 可支持的类型选择；
>
> `messages`: {Object}, type/scope/subject/body/footer 提示占位符；
>
> `maxLen`: {number}, commit 信息的最大字数长度限制，默认 100；
>
> `minLen`: {number}, commit 信息的最小字数长度限制，默认 0；
>
> `subjectLimit`: {number}, subject 简短描述最大字数限制，默认 50；
>
> `skipQuestions`: {Array}, 询问交互中允许跳过的步骤，默认 ["body", "footer"]；
>
> `scopeRequired`: {boolean}, scope 变更范围的填写，是否必填，默认 false;
>
> `lang`: 询问交互中提示的语言，支持 en-US、zh-CN, 默认 en-US；

<details>

 <summary>默认配置文件预览</summary>

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

</details>

## gitcommitrc.json

在项目根目录下，添加 gitcommitrc.json 文件，去 重写/覆盖 默认配置。具体格式可参考上面的默认配置。

最后项目配置将取 默认配置文件和本地配置文件 gitcommitrc.json 的并集：

> const config = { ...defaultConfig, ...localConfig }

配置范例 [gitcommitrc-example.json](https://github.com/chenyajin/git-cm/blob/main/gitcommitrc-example.json)中查看配置文件的格式

## 特性

1、可视化：学习成本低，友好的界面提示；

2、零配置：安装即可使用；

3、校验格式：允许手动输入提交消息，验证符合 [AngularJS 提交规范](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines)，给出提示；

4、询问式交互：允许通过询问式交互自定义提交信息；

5、定制化：支持本地配置文件，自定义提交规则；

6、支持 i18n：支持配置 中文/英文，默认英文；
