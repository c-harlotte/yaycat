/**
 * @file src/utils/LogLevel.ts
 * Defines the LogLevel class, used in the Logger.
 * @author lambdagg <lambda@jikt.im>
 */

import type { BackgroundColor, ForegroundColor, Modifiers } from "chalk";
import chalk from "chalk";

export default class LogLevel {
  readonly code: string;

  readonly fgColor: typeof ForegroundColor;

  readonly bgColor: typeof BackgroundColor;

  readonly modifiers: typeof Modifiers[];

  constructor(
    code: string,
    fgColor?: typeof ForegroundColor,
    bgColor?: typeof BackgroundColor,
    ...modifiers: typeof Modifiers[]
  ) {
    this.code = code;
    this.fgColor = fgColor;
    this.bgColor = bgColor;
    this.modifiers = modifiers ?? [];
  }

  apply(str: string): string {
    let s = str;
    if (this.fgColor) s = chalk[this.fgColor](str);
    if (this.bgColor) s = chalk[this.bgColor](str);
    this.modifiers.forEach(($) => {
      s = chalk[$](s);
    });
    return s;
  }
}
