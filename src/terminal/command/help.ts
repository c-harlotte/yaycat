import { bold } from "chalk";
import TerminalExt from "../TerminalExt";
import TerminalCommand from "./TerminalCommand";

export default class RestartCommand extends TerminalCommand {
  constructor() {
    super("help", "shows this message", ["?"]);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  run(_: string, _args: string[]): void {
    const th = TerminalExt.INSTANCE;
    th.commands.forEach((cmd) =>
      th.log(`${bold(cmd.name)} ${cmd.description}`)
    );
  }
}
