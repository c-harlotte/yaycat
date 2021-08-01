import TerminalExt from "../TerminalExt";
import TerminalCommand from "./TerminalCommand";

export default class RestartCommand extends TerminalCommand {
  constructor() {
    super("exit", "stops the running process", ["stop", "end"]);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  run(_: string, _args: string[]): void {
    console.log("Exiting from user interaction");
    TerminalExt.INSTANCE.client.destroy();
    process.exit(0);
  }
}
