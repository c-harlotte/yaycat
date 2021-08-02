/**
 * @file tools/times.cjs
 * Calculating timings on shell executions.
 * @author lambdagg <lambdagg@jikt.im>
 */

"use strict";

const chalk = require('chalk');
const shell = require(`${__dirname}/util/shell.cjs`);

const name = process.argv[2];
const tasks = [];

if (!name || !tasks) throw new Error("Usage: node times.cjs 'taskname' 'bash script' 'another bash script'");

let clear = true;

process.argv.splice(3).map($ => {
  if ($ !== "--no-clear") tasks.push($);
  else clear = false;
});

const important = (s) => chalk.bgWhite(chalk.black(chalk.bold(s)));

console[clear ? "clear" : "log"]();
console.log(important(`>> Task ${name} starting...`));
console.log();

const start = Date.now();
let currStart, index = 0;
shell.exec(tasks, (command) => {
  console.log(chalk.cyan(`${name}#${index} > ${command}`));
  currStart = Date.now();
}, (command, array, err) => {
  if (err) console.log(chalk.red(err));
  const now = Date.now();
  console.log(chalk.green(`Task ${name}#${index} done with exit code ${err?.code || 0} in ${now - currStart}ms.`));
  console.log();
  if (!array.length) {
    console.log(important(`>> Task ${name} done in ${now - start}ms!`));
  }
  index++;
});
