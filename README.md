# git-cm

A simple tool to allow you to easily commit your files.

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

when you use `git-cm`, without a committing message, you'll be prompted to fill out any required commit fields at commit time with a format of the default configuration file.

you can see the format of the default configuration file in [gitcommitrc-example.json](https://github.com/chenyajin/git-cm/blob/main/gitcommitrc-example.json)

Of course, you can also create `gitcommitrc.json` file in your home directory, to overwriting the default file.

when you use `git-cm`, with a committing message, such as `git-cm -m 'type(scope): subject'`, the message will be verified, whether to use [AngularJS's commit message convention](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines).
