/**
 * @file src/utils/log.ts
 * Logger utilities.
 * @author lambdagg <lambda@jikt.im>
 */

import { createWriteStream, existsSync, mkdirSync } from "fs";
import { join } from "path";
// eslint-disable-next-line import/no-cycle
import TerminalExt from "../terminal/TerminalExt";
import LogLevel from "./LogLevel";

const LOGS_PATH = join(__dirname, "..", "..", "logs");

// eslint-disable-next-line no-shadow
export const LogLevels = {
  TRACE: new LogLevel("TRC", "blue"),
  DEBUG: new LogLevel("DBG", "cyan"),
  INFO: new LogLevel("INF", "whiteBright"),
  WARNING: new LogLevel("WRN", "yellowBright"),
  ERROR: new LogLevel("ERR", "red"),
  FATAL: new LogLevel("FTL", "white", "bgRedBright"),
};

export const format = (s: string, ...arr: string[]): string =>
  s.replace(/{(\d+)}/g, (match, number) =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    typeof arr[number] !== "undefined" ? arr[number] : match
  );

function log(type: LogLevel, msg: string, ...f: string[]): void {
  const logLevels = Object.keys(LogLevels);
  if (
    logLevels.indexOf(logLevels.find((k) => LogLevels[k] === type)) <
    (logLevels.indexOf((process.env.LOG_LEVEL ?? "").toUpperCase()) + 1 || 3) -
      1
  ) {
    return;
  }
  // eslint-disable-next-line no-param-reassign
  if (f?.length) msg = format(msg, ...f);
  const date = new Date();
  const obj = date.toString().split(" ");
  let caller: string | string[] = "";
  if (process.env.NODE_ENV === "dev") {
    caller = (
      new Error().stack
        ?.split("\n")[3]
        .replace(/\\/g, "/")
        .replace(/["'()]/g, "")
        .split("/")
        .pop() || "unknownCaller"
    ).split(":");
    const maxNameSize = 16;
    const maxLineSize = 3;
    const maxCharSize = 3;
    const maxTotalSize = maxNameSize + 1 + maxLineSize + 1 + maxCharSize;
    if (caller.length > 1) {
      const fullName = caller[0].split(".");
      let name = fullName[0];
      let ext = fullName[1] || "";
      if (ext.length) ext = `.${ext}`;

      if (name.length > maxNameSize - ext.length)
        name = `${name.substring(0, maxNameSize - ext.length - 3)}...`;
      name += ext;
      name = (
        name.length !== maxNameSize ? name + " ".repeat(maxNameSize) : name
      ).substring(0, maxNameSize);

      const line = `${"0".repeat(maxLineSize)}${
        caller[1].length > maxLineSize ? "^".repeat(maxLineSize) : caller[1]
      }`.slice(-maxLineSize);
      const char = `${"0".repeat(maxCharSize)}${
        caller[2].length > maxCharSize ? "^".repeat(maxCharSize) : caller[2]
      }`.slice(-maxCharSize);
      caller = `${name}:${line}:${char}`;
    } else
      caller = `${caller[0] || "<unknown>"}${" ".repeat(
        maxTotalSize
      )}`.substring(0, maxTotalSize);
  }
  if (caller) caller = ` ${caller}`;
  const prefix = `[${type.code}] [${
    obj[4]
  }.${`00${date.getMilliseconds()}`.slice(-3)}${obj[5].slice(-5)}]${caller}`;

  if (!existsSync(LOGS_PATH)) mkdirSync(LOGS_PATH);
  const writeStream = createWriteStream(
    join(
      LOGS_PATH,
      `${new Date().toISOString().split("T")[0].replace(/\//g, "-")}.log`
    ),
    {
      flags: "a", // append the logs, do not replace the file
      encoding: "utf-8",
    }
  );

  msg.split("\n").forEach((v, index, arr) => {
    const out = type.apply(
      `${index === 0 ? prefix : "-".repeat(prefix.length)} ${v}`
    );
    if (TerminalExt.INSTANCE) TerminalExt.INSTANCE.log(out);
    else console.log(out);
    writeStream.write(
      // Replace ANSI styling codes!
      `${out.replace(
        // eslint-disable-next-line no-control-regex
        /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
        ""
      )}\n`
    );
    if (index + 1 === arr.length) writeStream.end();
  });
}

export function trace(msg: string, ...f: string[]): void {
  log(LogLevels.TRACE, msg, ...f);
}

export function debug(msg: string, ...f: string[]): void {
  log(LogLevels.DEBUG, msg, ...f);
}

export function info(msg: string, ...f: string[]): void {
  log(LogLevels.INFO, msg, ...f);
}

export function warning(msg: string, ...f: string[]): void {
  log(LogLevels.WARNING, msg, ...f);
}

export function error(msg: string, ...f: string[]): void {
  log(LogLevels.ERROR, msg, ...f);
}

export function fatal(msg: string, ...f: string[]): void {
  log(LogLevels.FATAL, msg, ...f);
}
