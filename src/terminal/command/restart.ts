import { exec } from "child_process";
import { warning } from "../../logger";
import TerminalExt from "../TerminalExt";
import TerminalCommand from "./TerminalCommand";

export default class RestartCommand extends TerminalCommand {
  constructor() {
    super("restart", "restarts the running process from pm2", ["rs", "reboot"]);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  run(_: string, _args: string[]): void {
    warning("Restarting now!");
    TerminalExt.INSTANCE.client.destroy();
    exec("pm2 restart app");
  }
}
