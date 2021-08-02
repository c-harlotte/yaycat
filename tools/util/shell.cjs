/**
 * @file tools/util/shell.cjs
 * Handling shell-related functions
 * @author lambdagg <lambdagg@jikt.im>
 */

"use strict";

/**
 * Callback for executing commands through exec(string[], function(...)).
 *
 * @callback execCallback
 * @param {string} command The command that has been executed.
 * @param {Error} error The error that occured during execution, or undefined
 *                      if there are none.
 */

/**
 * Execute commands, each one in a different childprocess.
 *
 * @param {string[]} arr The commands to execute.
 * @param {startCallback} startCallback Callback when any of the command has
 *                                      started being executed.
 * @param {execCallback} callback Callback when any of the command execution is
 *                               done or an error has been thrown.
 * @param {boolean} callbackEveryCall If true, calls the callback function
 *                                    each time a command has been executed.
 *                                    Else, only call it when the whole work is
 *                                    done.
 * @param {boolean} stopIfError Stops the script if any of the commands fail.
 * @param {boolean} silentThrow If true, only return instead of throwing an
 *                              error. Only works if stopIfError is true.
 */
exports.exec = function (arr, startCallback, callback, callbackEveryCall = true, stopIfError = false, silentThrow = false) {
  const commands = [...arr];
  (function $() {
    const command = commands.shift();
    startCallback(command);
    require("child_process").exec(command, (err, stdout, stderr) => {
      let error;
      if (err) error = err;
      else if (stderr) console.err(stderr);
      else if (stdout) console.log(stdout);

      if(callbackEveryCall) callback(command, commands, error);
      if (stopIfError && error) {
        if (!callbackEveryCall) callback(command, commands, error);
        if (silentThrow) return;
        throw error;
      }
      if (commands.length) $();
      else if (!callbackEveryCall) callback(command, commands, error);
    });
  })();
};
