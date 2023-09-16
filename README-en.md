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

- [English](https://github.com/chenyajin/git-cm/blob/main/README.md)
- [简体中文](https://github.com/chenyajin/git-cm/blob/main/README-zh.md)

> A lightweight, independent, 0 configurations git commit message tool
>
> ✨ Allow one-time input of the commit message and then verify it to ensure compliance with [AngularJS's commit message convention](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines).
>
> ✨ Allow customization of your commit information through inquiry
>
> ✨ Allow adding configuration files in the project and customizing your git commit message,or using default configurations.

![git-cm-verify-demo](https://raw.githubusercontent.com/chenyajin/git-cm/dev/assets/messsage_verify_en.png)

![git-cm-select-demo](https://raw.githubusercontent.com/chenyajin/git-cm/dev/assets/select_success_en.png)

## Installing the command line tool

Installation is as simple as running the following command (if you see `EACCES` error, reading [fixing npm permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions) may help):

```sh
npm install -g git-cm
```

## Using the command line tool

Simply use `git-cm` or `cm` instead of `git commit` when committing.

Supported command line options

```sh
git-cm
git-cm -a
git-cm -m 'type(scope): subject'
git-cm -am 'type(scope): subject'
```

or as an npm script:

```json
  ...
  "scripts": {
    "commit": "git-cm"
  }
```

---

when you use `git-cm`, without a committing message, you'll be prompted to fill out any required commit fields at commit time with a format of the default configuration file.

you can see the format of the default configuration file in [gitcommitrc.json](https://github.com/chenyajin/git-cm/blob/main/gitcommitrc.json)

Of course, you can also create `gitcommitrc.json` file below in the root directory of your project, to overwriting the default file.

when you use `git-cm`, with a committing message, such as `git-cm -m 'type(scope): subject'`, the message will be verified, whether to use [AngularJS's commit message convention](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines).

---

## Recommended Commit Message Format

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

The `<type>` and `<summary>` fields are mandatory, the `(<scope>)` field is optional.

❌ Bad:

> update README to add how to install

✅ Good:

> docs: update README to add how to install

✅ Good (commit message with scope):

> docs(README): update README to add how to install

The default commit `type`s can be extended or modified by [gitcommitrc.json](https://github.com/chenyajin/git-cm/blob/main/README.md#gitcommitrc.json).

## Zero Configurations

**Configurations Not Required!** If it has to be customized we have the guide below.

The default `type`s includes **feat**, **fix**, **docs**, **style**, **refactor**, **test**, **chore**, **perf**, **ci**, **build** and **chore**.

The default `max-len` is 100 which means the commit message cannot be longer than 100 characters. All the settings can be modified in gitcommitrc.json.

### gitcommitrc.json

Except for default types, you can add, overwrite.

For example if you have this `gitcommitrc.json` file below in the root directory of your project:

you can see the format of the example configuration file in [gitcommitrc-example.json](https://github.com/chenyajin/git-cm/blob/main/gitcommitrc-example.json)

<details>
 <summary>More advanced settings</summary>

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

## Features

1. Visualization, low cost to Learn.
2. Independent, zero configurations.
3. Support for local configuration files and customizing your git commit message.
4. Prompt error msg precisely, friendly to commit message format unfamiliar developers.
5. i18n: **en-US**, **zh-CN** supported.
6. The linter is customizable for your team by configuring local files.

