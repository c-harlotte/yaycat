# yaycat

best bot. [discord.gg/catstare](https://discord.gg/catstare)


## Installation

First, you have to clone the repo — `git clone https://github.com/c-harlotte/yaycat`

Next, just move to the directory produced by the clone — `cd yaycat`

Finally, we built a script just for you, so you don't need to do anything else than observe — `npm init`


## First-time setup

First, you've got to copy the [.env.example](./.env.example) file and rename it `config.toml`, and set your own properties.

Then, you just have to to the same for [config.example.toml](./config.example.toml). Simple as that!


## Running

### a) Debugging, development environment

You can use the `debug` script to run TypeScript directly, without losing time compiling the whole project — `yarn debug`

You can use the `debug:watch` script to do the same, with an auto-reload — `yarn debug:watch`

**KEEP IN MIND:** These scripts are unsafe to use in production mode, and therefore should only be used in a development process as they can cause major problems and bugs.


### b) Production environment

**IF YOU USE WINDOWS:** You need the [Windows Git Bash](https://gitforwindows.org/) (or WSL, but still untested) to run any of the build scripts, because these use GNU/Linux commands to work.

You can use the `all` script to automatically compile your TypeScript into the **dist/** folder, and run it directly after — `yarn all`

Alternatively, if you only wish to compile your application one-time and execute the same version each time, use the `cleanbuild` script first then use the `start` script to start your application — `yarn cleanbuild`, `yarn start`


## Contributors

Initially done in JavaScript by [charlotte](https://github.com/C-HARLOTTE) \<charlotte@ahegao.agency>, this bot has been ported to TypeScript by [lambdagg](https://lambdagg.xyz) \<lambda@jikt.im>.

This project is fully open to contributors, if you wish to edit a functionality you can [fork the repository](./fork), then [create a pull request](./compare) after verifying that your code compiles, and that our linter and writing rules are respected. Otherwise, if you don't have development skills (which is completely understandable, ngl), you can just [create a new issue](./issues/new) and explain what your idea is. We'll make the best to help you and discuss the feature to add it - and, of course, credit you!


## Reporting a bug

You can [file a new issue](./issues/new) with the `bug` label to report us any kind of problem you've encountered. Thank you by advance for following the scheme.


## Licensing and redistribution

Please follow the [LICENSE file](./LICENSE) before redistributing this project.
